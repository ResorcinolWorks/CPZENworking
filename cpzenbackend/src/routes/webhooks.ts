import { Router } from 'express';
import { WebhookController } from '../controllers/WebhookController';
import { asyncHandler } from '../middleware/errorHandler';

const router = Router();

// Webhook route - no auth required, Svix handles verification
router.post('/clerk', asyncHandler(WebhookController.handleClerkWebhook));

export default router; 