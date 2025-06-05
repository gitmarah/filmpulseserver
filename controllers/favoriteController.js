import Favorite from "../models/Favorite.js";

const favoriteControllers =  {
    getFavorite: async (req, res) => {
        const {userId} = req?.params;
        const result = await Favorite.find({userId});
        res.status(200).json(result);
    },
    addFavorite: async (req, res) => {
        const {userId, movieId, checked, type, poster, status, release_date, title} = req?.body;
        if(!userId || !movieId || !type) return res.status(400).json({"message": "Every field is required!"});
        const result = await Favorite.create({userId, movieId, checked, type, poster, status, release_date, title});
        res.status(201).json({"message": "Successfully saved!"});
    },
    deleteFavorite: async (req, res) => {
        const { id } = req?.params;
        if(!id) return res.status(400).json({"message": "User Id is required!"});
        const result = await Favorite.deleteOne({_id:id}).exec();
        if(result.acknowledged) res.json({"message": `Successfully deleted ${id}`}); 
    },
    checkFavorite: async (req, res) => {
        const { id } = req?.body;
        if(!id) return res.status(400).json({"message": "User Id is required!"});
        const result = await Favorite.findOne({_id:id}).exec();
        result.checked = !result.checked;
        const newResult = await result.save();
        res.status(200).json(newResult);
    }
}

export default favoriteControllers