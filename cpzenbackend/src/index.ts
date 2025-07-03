import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

// Import configuration
import { config } from './config/environment';
import './config/database'; // Initialize database connection

// Import middleware
import { errorHandler } from './middleware/errorHandler';

// Import routes
import webhookRoutes from './routes/webhooks';
import progressRoutes from './routes/progress';
import topicRoutes from './routes/topics';
import notesRoutes from './routes/notes';

const app = express();

// CORS configuration
app.use(cors({
  origin: config.frontend.url,
  credentials: true
}));

// Webhook routes need raw body, so they come first
app.use(
  '/api/webhooks',
  express.raw({ type: 'application/json' }),
  webhookRoutes
);

// JSON parsing for other routes
app.use(express.json());

// Clerk authentication middleware
app.use(ClerkExpressWithAuth());

// API routes
app.use('/api/progress', progressRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/notes', notesRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CpZen Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler for unmatched routes - must be before the global error handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `API endpoint not found: ${req.originalUrl}`
  });
});

// Global error handler (must be last)
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`🚀 CpZen Backend server running on port ${config.port}`);
  console.log(`📊 Environment: ${config.nodeEnv}`);
}); 