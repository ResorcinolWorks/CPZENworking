import { Request, Response } from 'express';
import { ProgressService } from '../services/ProgressService';
import { asyncHandler, AppError } from '../middleware/errorHandler';

export class ProgressController {
  // GET /api/progress - Get user's complete progress data
  static getUserProgress = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth!.userId!; // Auth guaranteed by requireAuth middleware
    const progressData = await ProgressService.getUserProgress(userId);
    
    res.json({
      success: true,
      data: progressData
    });
  });

  // POST /api/progress/toggle - Toggle topic completion status
  static toggleTopicCompletion = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth!.userId!;
    const { topicId } = req.body;
    
    const result = await ProgressService.toggleTopicCompletion(userId, topicId);
    
    res.json({
      success: true,
      data: result
    });
  });

  // POST /api/progress/complete - Mark topic as complete
  static markTopicComplete = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth!.userId!;
    const { topicId } = req.body;
    
    await ProgressService.markTopicComplete(userId, topicId);
    
    res.status(201).json({
      success: true,
      message: 'Topic marked as complete'
    });
  });

  // PUT /api/progress/last-topic - Update last visited topic
  static updateLastTopic = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth!.userId!;
    const { topicId } = req.body;
    
    await ProgressService.updateLastVisitedTopic(userId, topicId);
    
    res.json({
      success: true,
      message: 'Last visited topic updated'
    });
  });

  // GET /api/progress/stats - Get user progress statistics
  static getUserStats = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth!.userId!;
    const stats = await ProgressService.getUserStats(userId);
    
    res.json({
      success: true,
      data: stats
    });
  });

  // GET /api/progress/next - Get next recommended topic
  static getNextRecommendedTopic = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.auth!.userId!;
    const nextTopic = await ProgressService.getNextRecommendedTopic(userId);
    
    res.json({
      success: true,
      data: { nextTopicId: nextTopic }
    });
  });
} 