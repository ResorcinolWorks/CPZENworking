import { Request, Response } from 'express';
import { Webhook } from 'svix';
import { UserModel } from '../models/User';

interface WebhookEvent {
  type: string;
  data: {
    id: string;
    email_addresses?: Array<{ email_address: string }>;
    first_name?: string;
    last_name?: string;
  };
}

export class WebhookController {
  static async handleClerkWebhook(req: Request, res: Response) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
    
    if (!WEBHOOK_SECRET) {
      return res.status(500).json({ 
        success: false, 
        message: 'Webhook secret not configured' 
      });
    }

    const headers = req.headers;
    const payload = req.body;

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
      evt = wh.verify(payload, {
        'svix-id': headers['svix-id'] as string,
        'svix-timestamp': headers['svix-timestamp'] as string,
        'svix-signature': headers['svix-signature'] as string,
      }) as WebhookEvent;
    } catch (err) {
      console.error('Error verifying webhook:', err);
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid webhook signature' 
      });
    }

    const { type, data } = evt;

    try {
      switch (type) {
        case 'user.created':
        case 'user.updated':
          await UserModel.createUser(
            data.id,
            data.email_addresses?.[0]?.email_address,
            data.first_name,
            data.last_name
          );
          console.log(`User ${type}: ${data.id}`);
          break;

        case 'user.deleted':
          await UserModel.deleteUser(data.id);
          console.log(`User deleted: ${data.id}`);
          break;

        default:
          console.log(`Unhandled webhook type: ${type}`);
      }

      res.status(200).json({ 
        success: true, 
        message: 'Webhook processed successfully' 
      });
    } catch (error) {
      console.error('Error processing webhook:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error processing webhook' 
      });
    }
  }
} 