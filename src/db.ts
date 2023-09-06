import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost/merndb");
  } catch (error) {
    throw new Error("Error connecting DB");
  }
};
