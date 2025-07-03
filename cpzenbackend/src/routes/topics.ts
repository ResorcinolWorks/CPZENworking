import { Router } from 'express';
import { TopicController } from '../controllers/TopicController';
import { optionalAuth } from '../middleware/auth';

const router = Router();

// Apply optional auth - topics can be viewed without authentication
router.use(optionalAuth);

// Topic routes
router.get('/', TopicController.getAllTopics);
router.get('/stats', TopicController.getTopicStats);
router.get('/difficulty/:difficulty', TopicController.getTopicsByDifficulty);
router.get('/:id', TopicController.getTopicById);

export default router; 