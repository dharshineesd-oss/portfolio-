import { Router, Request, Response } from 'express';
import mongoose from 'mongoose';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  const dbState = mongoose.connection.readyState;
  const dbStatusMap: { [key: number]: string } = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };

  res.status(200).json({
    success: true,
    message: 'Portfolio Backend REST API is healthy',
    data: {
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: dbStatusMap[dbState] || 'unknown',
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

export default router;
