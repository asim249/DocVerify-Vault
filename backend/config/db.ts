
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("MongoDB Connected");
    } catch (error: any) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB








