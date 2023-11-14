import mongoose from "mongoose";

// create mongodb connection
export const mongodbConnection = async () => {
  try {
    // mongodb local
    // const connection = await mongoose.connect("mongodb://127.0.0.1/linkedin");

    // mongodb cloud
    const connection = await mongoose.connect(process.env.MONGODB_URL);

    console.log(`Mongodb connection successful`.bgBlue.black);
  } catch (error) {
    console.log(`Mongodb connection failed ${error.message}`.bgRed.black);
  }
};
