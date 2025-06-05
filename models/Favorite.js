import mongoose from "mongoose";
import { Schema } from "mongoose";

const favoriteSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    poster: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    release_date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    movieId: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    }
});

export default mongoose.model("Favorite", favoriteSchema);