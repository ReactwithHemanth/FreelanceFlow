import mongoose from "mongoose";
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please add your MongoDB URI to .env.local");
}

const dbConnect = async () => {
  try {
    if (mongoose.connection.readyState >= 1) {
      return mongoose.connection;
    }

    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    // throw new Error("MongoDB connection failed");
  }
};

export default dbConnect;
