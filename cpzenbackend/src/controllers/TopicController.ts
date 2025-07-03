import { Request, Response } from 'express';
import { TopicService } from '../services/TopicService';
import { asyncHandler } from '../middleware/errorHandler';

export class TopicController {
  // GET /api/topics - Get all topics
  static getAllTopics = asyncHandler(async (req: Request, res: Response) => {
    const topics = TopicService.getAllTopics();
    
    res.json({
      success: true,
      data: topics
    });
  });

  // GET /api/topics/:id - Get specific topic
  static getTopicById = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const topic = TopicService.getTopicById(id);
    
    if (!topic) {
      return res.status(404).json({
        success: false,
        error: 'Topic not found'
      });
    }
    
    res.json({
      success: true,
      data: topic
    });
  });

  // GET /api/topics/difficulty/:difficulty - Get topics by difficulty
  static getTopicsByDifficulty = asyncHandler(async (req: Request, res: Response) => {
    const { difficulty } = req.params;
    
    if (!['Easy', 'Medium', 'Hard'].includes(difficulty)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid difficulty. Must be Easy, Medium, or Hard'
      });
    }
    
    const topics = TopicService.getTopicsByDifficulty(difficulty as 'Easy' | 'Medium' | 'Hard');
    
    res.json({
      success: true,
      data: topics
    });
  });

  // GET /api/topics/stats - Get topic statistics
  static getTopicStats = asyncHandler(async (req: Request, res: Response) => {
    const stats = TopicService.getTopicStats();
    
    res.json({
      success: true,
      data: stats
    });
  });
} 