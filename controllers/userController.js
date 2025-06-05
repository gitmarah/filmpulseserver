import Users from "../models/Users.js";
import s3, { getImageUrl } from "../config/s3Config.js";
import sharp from "sharp";
import { PutObjectCommand } from "@aws-sdk/client-s3";

const userController = {
    getUsers: async (req, res) => {
        const users = await Users.find().exec();
        users?.map(async (user) => {
            user.imageUrl = await getImageUrl(user.profilephoto);
            await user.save();
        });
        res.json(users);
    },
    getUser: async (req, res) => {
        const { id } = req.params;
        if (!id) return res.status(400).json({"message": "User Id is required!"});
        try{
            const user = await Users.findOne({_id: id}).exec();
            if(!user) return res.status(404).json({"message": `User ${id} not found!`});
            user.imageUrl = await getImageUrl(user.profilephoto);
            await user.save()
            res.json(user);
        } catch (err) {
            res.status(400).json({"message": `${err.message}`})
        }
        
    },
    updateUser: async (req, res) => {
        const { id } = req.body;
        if(!id) return res.status(400).json({"message": "User Id is required!"});
        const user = await Users.findOne({_id: id}).exec();
        if(!user) return res.status(400).json({"message": `User ${id} does not exist!`});
        if(req?.body?.firstname) user.firstname = req.body.firstname;
        if(req?.body?.lastname) user.lastname = req.body.lastname;
        if(req?.file){
            const optimizedBuffer = await sharp(req.file?.buffer).webp({quality: 80}).toBuffer();
            const params = {
                Bucket: process.env.BUCKET_NAME,
                Key: user.profilephoto,
                Body: optimizedBuffer,
                ContentType: "image/webp"
            }
            const command = new PutObjectCommand(params)
            await s3.send(command);
            user.imageUrl = await getImageUrl(user.profilephoto);
        }
        await user.save();
        res.status(200).json(user);
    },
    deleteUser: async (req, res) => {
        const { id } = req?.body;
        if(!id) return res.status(400).json({"message": "User Id is required!"});
        const result = await Users.deleteOne({_id:id}).exec();
        if(result.acknowledged) res.json({"message": `Successfully deleted ${id}`}); 
    },
    makeAdmin: async (req, res) => {
        const { id } = req?.body;
        if(!id) return res.status(400).json({"message": "User Id is required!"});
        const user = await Users.findOne({_id:id}).exec();
        if(user.roles.includes(1984)) return res.status(400).json({"message": "User is already an admin!"});
        user.roles.push(1984);
        await user.save();
        res.json({"message": `${user.firstname} is now an admin!`});
    }
}

export default userController;