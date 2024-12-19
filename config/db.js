import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors';

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to mongodb ${conn.connection.host}`.bgCyan.white);

    }catch(err){
        console.log(`Error in mongodb ${err}`.bgRed.white);

    }
}

export default connectDB;
