import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connection success " + conn.connection.host);
  } catch (error) {
    console.log("Database Connection failed " + error);
    process.exit(1);
  }
};
export default connectDb;
