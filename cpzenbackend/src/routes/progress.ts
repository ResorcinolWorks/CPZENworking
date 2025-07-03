import { Router } from 'express';
import { ProgressController } from '../controllers/ProgressController';
import { requireAuth } from '../middleware/auth';
import { validateTopicId } from '../middleware/validation';

const router = Router();

// Apply authentication to all progress routes
router.use(requireAuth);

// Progress routes
router.get('/', ProgressController.getUserProgress);
router.get('/stats', ProgressController.getUserStats);
router.get('/next', ProgressController.getNextRecommendedTopic);
router.post('/toggle', validateTopicId, ProgressController.toggleTopicCompletion);
router.post('/complete', validateTopicId, ProgressController.markTopicComplete);
router.put('/last-topic', validateTopicId, ProgressController.updateLastTopic);

export default router; 