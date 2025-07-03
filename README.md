# CpZen Progress Hub 🚀

A comprehensive competitive programming learning platform built with React (Vite) frontend and Node.js Express backend, featuring Clerk authentication and Neon PostgreSQL database.

## 🌟 Features

- **User Authentication**: Clerk OAuth integration for secure login/signup
- **Progress Tracking**: Track completion status across 16 competitive programming topics
- **Topic Management**: Curated learning path from Easy to Hard difficulty levels
- **Notes System**: Save concise notes (max 100 characters) for each topic
- **Responsive Design**: Beautiful UI with dark/light theme support
- **Real-time Sync**: Progress and notes sync across devices

## 🏗 Project Structure

```
CpzenProgress/
├── cpzenfrontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Route components
│   │   ├── lib/           # API client and utilities
│   │   └── context/       # React context providers
│   └── package.json
├── cpzenbackend/          # Node.js Express backend
│   ├── src/
│   │   ├── controllers/   # API route handlers
│   │   ├── models/        # Database models
│   │   ├── services/      # Business logic
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Auth & validation
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (Neon recommended)
- Clerk account for authentication

### 1. Clone the Repository

```bash
git clone https://github.com/ResorcinolWorks/CPZENworking.git
cd CpzenProgress
```

### 2. Backend Setup

```bash
cd cpzenbackend
cp .env.example .env
npm install
```

After creating the `.env` file, make sure to fill in your credentials.

Create `.env` file in `cpzenbackend/`:

```env
# Database
DATABASE_URL=your_neon_postgresql_connection_string

# Clerk Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# Server Configuration
PORT=3001
NODE_ENV=development
FRONTEND_URL=http://localhost:8080
```

Run database migrations:

```bash
# Connect to your PostgreSQL database and run the contents of database.sql
psql $DATABASE_URL -f database.sql
```

Start the backend server:

```bash
npm run dev
```

Backend will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd cpzenfrontend
cp .env.example .env
npm install
```

After creating the `.env` file, make sure to fill in your credentials.

Create `.env` file in `cpzenfrontend/`:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=http://localhost:3001/api
```

Start the frontend server:

```bash
npm run dev
```

Frontend will run on `http://localhost:8080`

### 4. Clerk Webhook Setup

1. Go to your Clerk Dashboard → Webhooks
2. Add a new webhook endpoint: `http://localhost:3001/api/webhooks/clerk`
3. Subscribe to these events:
   - `user.created`
   - `user.updated`
   - `user.deleted`

## 📊 Database Schema

The application uses the following main tables:

- **users**: Store Clerk user information
- **user_progress**: Track completed topics per user
- **user_last_topic**: Remember user's last visited topic
- **user_notes**: Store user notes for each topic (max 100 chars)

## 🛠 API Endpoints

### Topics (Public)
- `GET /api/topics` - Get all topics
- `GET /api/topics/:id` - Get specific topic
- `GET /api/topics/difficulty/:difficulty` - Get topics by difficulty

### Progress (Auth Required)
- `GET /api/progress` - Get user's complete progress
- `POST /api/progress/toggle` - Toggle topic completion
- `GET /api/progress/stats` - Get user statistics
- `GET /api/progress/next` - Get next recommended topic

### Notes (Auth Required)
- `GET /api/notes/:topicId` - Get user's note for topic
- `POST /api/notes` - Save/update note for topic
- `DELETE /api/notes/:topicId` - Delete note for topic

### Webhooks
- `POST /api/webhooks/clerk` - Handle Clerk user events

## 🎨 Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **shadcn/ui** component library
- **Clerk React** for authentication
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **PostgreSQL** with native driver
- **Clerk SDK** for authentication
- **CORS** for cross-origin requests
- **SVIX** for webhook verification

## 🚢 Deployment Guide

This project is a monorepo and should be deployed as two separate services: a backend service for the Node.js API and a frontend service for the React application. We recommend using [Railway](https://railway.app/) for the backend and [Vercel](https://vercel.com/) for the frontend for their generous free tiers and ease of use with monorepos.

### 1. Database Setup (Neon)

If you haven't already, create a free PostgreSQL database on [Neon](https://neon.tech/).

1. After creating your project, find your database connection string.
2. In the Neon SQL Editor, paste the entire content of `database.sql` from this repository and run it to set up your tables.
3. Keep the connection string handy. You'll need it for the backend deployment. It will be your `DATABASE_URL`.

### 2. Backend Deployment (Railway)

1. **Create a Railway Project**: Go to [Railway](https://railway.app/) and create a new, empty project.
2. **Link GitHub Repo**: Connect your GitHub account and select your `CPZENworking` repository.
3. **Add Backend Service**: Add a new service from your repository. Railway should detect the `cpzenbackend/package.json`. If it asks, specify that you want to deploy from the `cpzenbackend` directory.
4. **Configure Service Settings**:
   - In the service settings, ensure the **Root Directory** is set to `cpzenbackend`.
   - Railway will automatically detect the `build` and `start` scripts from your `package.json`.
5. **Set Environment Variables**: In your service's "Variables" tab, add the following:
   - `DATABASE_URL`: Your Neon database connection string.
   - `CLERK_SECRET_KEY`: Your secret key from the Clerk dashboard.
   - `CLERK_WEBHOOK_SECRET`: Your webhook signing secret from Clerk.
   - `FRONTEND_URL`: Leave this blank for now. We'll add it after deploying the frontend.
   - `NODE_ENV`: `production`
   - `PORT`: Railway provides this automatically, so you don't need to set it.
6. **Get Backend URL**: Once deployed, Railway will provide a public URL for your backend (e.g., `my-backend-production.up.railway.app`). Note this down.

### 3. Frontend Deployment (Vercel)

1. **Create a Vercel Project**: Go to [Vercel](https://vercel.com/) and create a new project.
2. **Link GitHub Repo**: Connect your GitHub account and select your `CPZENworking` repository.
3. **Configure Project**:
   - Vercel will detect it's a monorepo. When asked for the **Root Directory**, select `cpzenfrontend`.
   - Vercel should automatically detect the Framework Preset as `Vite` and configure the build settings correctly.
     - **Build Command**: `vite build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
4. **Set Environment Variables**: In the project settings under "Environment Variables", add the following:
   - `VITE_CLERK_PUBLISHABLE_KEY`: Your publishable key from the Clerk dashboard.
   - `VITE_API_URL`: The public URL of your deployed backend from Railway (e.g., `https://my-backend-production.up.railway.app/api`).
5. **Deploy**: Click "Deploy". Vercel will build and deploy your frontend.

### 4. Final Configuration

1. **Update Backend `FRONTEND_URL`**: Go back to your Railway project and update the `FRONTEND_URL` variable with your production frontend URL from Vercel (e.g., `https://my-frontend.vercel.app`).
2. **Update Clerk Settings**:
   - In your Clerk dashboard, go to "Paths" and ensure your frontend and backend URLs are configured for production.
   - Go to "Webhooks" and create a new webhook pointing to your backend's webhook endpoint (e.g., `https://my-backend-production.up.railway.app/api/webhooks/clerk`). Make sure to subscribe to the `user.created`, `user.updated`, and `user.deleted` events.

Your application should now be live!

## 🔧 Development

### Backend Development

```bash
cd cpzenbackend
npm run dev        # Start with nodemon
npm run build      # Build TypeScript
npm start          # Run production build
```

### Frontend Development

```bash
cd cpzenfrontend
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure all tests pass
5. Submit a pull request

## 🐛 Common Issues

### Port Conflicts
- Backend runs on port 3001
- Frontend runs on port 8080
- Update ports in configuration if needed

### Authentication Issues
- Verify Clerk keys are correct
- Check webhook endpoint configuration
- Ensure CORS settings allow your frontend domain

### Database Connection
- Verify PostgreSQL connection string
- Ensure database schema is properly set up
- Check network connectivity to Neon

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Competitive programming community for topic curation
- Clerk for authentication infrastructure
- Neon for PostgreSQL hosting
- shadcn/ui for beautiful components 
