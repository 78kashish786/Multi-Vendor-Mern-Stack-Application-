import mongoose from 'mongoose'

import colors from 'colors';

const connectDB = async()=>{
    try{
        const conn = await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
        console.log(`connected to mongodb ${conn.connection.host}`.bgCyan.white);

    }catch(err){
        console.log(`Error in mongodb ${err}`.bgRed.white);

    }
}

export default connectDB;