import { Request, Response, NextFunction } from 'express';

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
  if (!req.auth?.userId) {
    res.status(401).json({
      success: false,
      message: 'Invalid auth - authentication required'
    });
    return;
  }
  next();
};

export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  // Allow requests with or without authentication
  next();
}; 