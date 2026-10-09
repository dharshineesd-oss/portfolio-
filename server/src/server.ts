import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB();

    app.listen(PORT, () => {
      console.log(`====================================================`);
      console.log(` Portfolio Backend Server running successfully!`);
      console.log(` Port:        http://localhost:${PORT}`);
      console.log(` Health:      http://localhost:${PORT}/api/health`);
      console.log(` Swagger UI:  http://localhost:${PORT}/api-docs`);
      console.log(` Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`====================================================`);
    });
  } catch (error: any) {
    console.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
