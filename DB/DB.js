import mongoose from "mongoose";
import {MONGO_URI} from "../config/env.js";

const connectToDB = async() => {
    try {
        const conn = await(mongoose.connect(MONGO_URI));
    console.log(`connected to db: ${conn.connection.host}` );
    } catch (error) {
        console.log(`failled to connect to db: `, error.message);
        process.exit(1);
        
    }
}

export default connectToDB;