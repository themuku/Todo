import mongoose from "mongoose";

const connectDb = async () => {
  try {
    mongoose.connect(process.env.DATABASE_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.error(error);
  }
};

export default connectDb;
