import { Router } from 'express';
import { NotesController } from '../controllers/NotesController';
import { requireAuth } from '../middleware/auth';
import { validateTopicId } from '../middleware/validation';

const router = Router();

// Apply authentication to all notes routes
router.use(requireAuth);

// Notes routes
router.get('/', NotesController.getAllUserNotes);
router.get('/:topicId', NotesController.getUserNote);
router.post('/', validateTopicId, NotesController.saveUserNote);
router.delete('/:topicId', NotesController.deleteUserNote);

export default router; 