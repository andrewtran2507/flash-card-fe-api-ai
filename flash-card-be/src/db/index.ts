import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const cntStr = `${process.env.DB_URL || ""}/flash_card_db`;
    const conn = await mongoose.connect(cntStr);
    console.log(`MongoDB Connected: ${cntStr}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
