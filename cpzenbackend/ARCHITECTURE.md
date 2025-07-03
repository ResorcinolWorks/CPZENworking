# CpZen Backend Architecture

## Overview
Professional Node.js/Express backend following clean architecture principles with proper separation of concerns, error handling, and data flow management.

## Project Structure
```
src/
├── config/           # Configuration files
│   ├── database.ts   # Database connection setup
│   └── environment.ts # Environment validation
├── middleware/       # Express middleware
│   ├── auth.ts       # Authentication middleware
│   ├── errorHandler.ts # Global error handling
│   └── validation.ts # Input validation
├── models/          # Data Access Layer (DAL)
│   ├── User.ts      # User database operations
│   └── Progress.ts  # Progress database operations
├── services/        # Business Logic Layer
│   ├── TopicService.ts    # Topic management
│   └── ProgressService.ts # Progress management
├── controllers/     # Route handlers
│   ├── ProgressController.ts
│   ├── TopicController.ts
│   └── WebhookController.ts
├── routes/          # Route definitions
│   ├── progress.ts  # Progress endpoints
│   ├── topics.ts    # Topic endpoints
│   └── webhooks.ts  # Clerk webhooks
├── types/           # TypeScript interfaces
│   └── index.ts     # Shared type definitions
└── index.ts         # Main server entry point
```

## Key Features

### 1. **Layered Architecture**
- **Controllers**: Handle HTTP requests/responses
- **Services**: Business logic and validation
- **Models**: Database operations
- **Middleware**: Cross-cutting concerns

### 2. **Robust Error Handling**
- Custom `AppError` class for operational errors
- Global error handler with environment-specific responses
- Async wrapper for clean error propagation
- Proper HTTP status codes

### 3. **Authentication & Security**
- Clerk JWT verification
- Route-level authentication middleware
- Input validation middleware
- Environment variable validation

### 4. **Data Flow Management**
- Consistent API response format
- Proper topic validation
- Database transaction patterns
- Clean separation of concerns

## API Endpoints

### Progress Management
- `GET /api/progress` - Get user's complete progress
- `GET /api/progress/stats` - Get progress statistics
- `GET /api/progress/next` - Get next recommended topic
- `POST /api/progress/toggle` - Toggle topic completion
- `POST /api/progress/complete` - Mark topic as complete
- `PUT /api/progress/last-topic` - Update last visited topic

### Topic Management
- `GET /api/topics` - Get all topics
- `GET /api/topics/:id` - Get specific topic
- `GET /api/topics/stats` - Get topic statistics
- `GET /api/topics/difficulty/:difficulty` - Filter by difficulty

### System
- `GET /api/health` - Health check
- `POST /api/webhooks` - Clerk user sync

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,  -- Clerk User ID
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  profile_image_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### User Progress Table
```sql
CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE,
  topic_id VARCHAR(255) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, topic_id)
);
```

### Last Topic Table
```sql
CREATE TABLE user_last_topic (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) REFERENCES users(id) ON DELETE CASCADE UNIQUE,
  topic_id VARCHAR(255) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

## Topic Management

Topics are managed centrally in `TopicService` with consistent IDs:

```typescript
// Topic IDs (sync with frontend)
"cpp-stl"
"arrays-hashing"
"two-pointers"
"sliding-window"
// ... etc
```

## Error Handling Strategy

```typescript
// Operational errors
throw new AppError('Topic not found', 404);

// Automatic error handling
router.post('/', asyncHandler(controller.method));

// Global error response
{
  success: false,
  error: "User-friendly message",
  stack: "Development only"
}
```

## Environment Variables
```env
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_...
CLERK_WEBHOOK_SECRET=whsec_...
NODE_ENV=development|production
PORT=3001
FRONTEND_URL=http://localhost:5173
```

## Benefits Achieved

1. **Maintainability**: Clear separation of concerns
2. **Scalability**: Modular architecture
3. **Reliability**: Comprehensive error handling
4. **Security**: Proper authentication and validation
5. **Developer Experience**: TypeScript, clean APIs
6. **Data Integrity**: Proper database patterns

## Next Steps for Frontend Integration

1. Update frontend to use topic IDs instead of names
2. Replace localStorage with API calls
3. Implement proper error handling in frontend
4. Add loading states for API calls
5. Sync ProgressContext with backend APIs 