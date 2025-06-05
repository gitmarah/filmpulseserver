import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    profilephoto: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        default: ''
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    },
    favmov: {
        type: [String],
        default: []
    },
    roles: {
        type: [Number],
        default: [2004]
    },
    refreshToken: String
}, { timestamps: true });

export default mongoose.model('User', userSchema);