export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  database: {
    url: process.env.DATABASE_URL,
  },
  clerk: {
    secretKey: process.env.CLERK_SECRET_KEY,
    webhookSecret: process.env.CLERK_WEBHOOK_SECRET,
  },
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:8080',
  },
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'CLERK_SECRET_KEY', 'CLERK_WEBHOOK_SECRET'];

requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(`Required environment variable ${envVar} is missing`);
  }
}); 