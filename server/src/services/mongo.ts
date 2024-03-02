import mongoose from "mongoose";
import "dotenv/config";

const mongoConnect = async () => {
  const mongoUrl = process.env.MONGO_URI;
  if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is not defined");
  }

  try {
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error during MongoDB connection:", error);
  }
};

async function mongoDisconnect() {
  await mongoose.disconnect();
}

export {
  mongoConnect,
  mongoDisconnect,
};
