import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

export const validateTopicId = (req: Request, res: Response, next: NextFunction) => {
  const { topicId } = req.body;
  
  if (!topicId || typeof topicId !== 'string' || topicId.trim().length === 0) {
    throw new AppError('topicId is required and must be a valid string', 400);
  }
  
  next();
};

export const validateRequiredFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missing = fields.filter(field => !req.body[field]);
    
    if (missing.length > 0) {
      throw new AppError(`Missing required fields: ${missing.join(', ')}`, 400);
    }
    
    next();
  };
}; 