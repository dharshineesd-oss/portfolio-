import mongoose from 'mongoose';

export const connectDB = async (): Promise<void> => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/dharshinee_portfolio';

  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`[MongoDB] Connected successfully to host: ${conn.connection.host}, database: ${conn.connection.name}`);
  } catch (error: any) {
    console.error(`[MongoDB Error] Connection failed: ${error.message}`);
    // In production, exit process on fatal DB connection failure
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};
