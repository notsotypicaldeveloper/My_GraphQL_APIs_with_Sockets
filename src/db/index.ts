import mongoose from "mongoose";

const connectDB = async()=> {
    try {

        const connectionInstance = await mongoose.connect((`${process.env.MONGO_DB_URI}`));
        console.log(`MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    }
    catch(error) {
        console.log("Our Error Logs:  MONGODB connection failed: ", error);
        process.exit(1);
    }
}
export default connectDB;

