import { Response } from 'express';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const sendSuccess = <T>(
  res: Response,
  message: string,
  data?: T,
  statusCode: number = 200
): Response => {
  const responseBody: ApiResponse<T> = {
    success: true,
    message,
    ...(data !== undefined && { data })
  };
  return res.status(statusCode).json(responseBody);
};

export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error?: string
): Response => {
  const responseBody: ApiResponse = {
    success: false,
    message,
    ...(error && { error })
  };
  return res.status(statusCode).json(responseBody);
};
