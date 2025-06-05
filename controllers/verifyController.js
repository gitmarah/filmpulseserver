import jsonwebtoken from 'jsonwebtoken';
import Users from '../models/Users.js';
const jwt = jsonwebtoken;

const verifyController = (req, res) => {
    const {token} = req.params;
    jwt.verify(
        token, 
        process.env.VERIFICATION_TOKEN, 
        async(err, decoded) => {
            if(err){
                if(err.message === "jwt expired")return res.json({"message": "Verification token expired!"});
                return res.json({"message": err.message});
            }else {
                const user = await Users.findOne({email: decoded.receiverEmail}).exec();
                user.verified = true;
                await user.save();
                return res.status(200).json({"message": "Successfully verified account!"})
            }
        }
    );
}

export default verifyController;