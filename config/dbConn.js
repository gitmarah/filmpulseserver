import mongoose from "mongoose";

const dbConn = () => {
    try{
        const result = mongoose.connect(process.env.DATABASE_URI);
    } catch(err){
        console.log(err.message);
    }
}

export default dbConn;