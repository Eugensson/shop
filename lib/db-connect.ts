import mongoose from "mongoose";

export const dbConnect = async (): Promise<void> => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MongoDB URI is not defined in environment variables");
  }

  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    throw new Error(`Connection failed: ${(error as Error).message}`);
  }
};
