# Deployment Guide

Complete guide for deploying the full-stack todo application to various platforms.

## Quick Start Options

### Option 1: Docker Compose (Local/Self-Hosted)

**Fastest way to run the entire stack locally:**

```bash
# 1. Clone the repository
git clone https://github.com/zareenarif/todo-app-phase-2.git
cd todo-app-phase-2

# 2. Update environment variables in docker-compose.yml
# Change BETTER_AUTH_SECRET to a secure random string

# 3. Start all services
docker-compose up -d

# 4. Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
```

### Option 2: Vercel (Frontend) + Railway (Backend)

**Recommended for production deployment:**

#### Deploy Backend to Railway

1. **Create Railway Account**: https://railway.app
2. **Install Railway CLI**:
   ```bash
   npm install -g @railway/cli
   ```
3. **Login and Deploy**:
   ```bash
   cd backend
   railway login
   railway init
   railway up
   ```
4. **Add PostgreSQL**:
   - In Railway dashboard, click "New" → "Database" → "PostgreSQL"
   - Railway automatically sets `DATABASE_URL` environment variable
5. **Set Environment Variables** in Railway dashboard:
   ```
   BETTER_AUTH_SECRET=<generate with: openssl rand -hex 32>
   CORS_ORIGINS=https://your-app.vercel.app
   DEBUG=False
   ```
6. **Run Migrations**:
   ```bash
   railway run alembic upgrade head
   ```
7. **Note your Railway URL** (e.g., `https://your-app.railway.app`)

#### Deploy Frontend to Vercel

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```
2. **Deploy**:
   ```bash
   cd frontend
   vercel
   ```
3. **Set Environment Variables** in Vercel dashboard:
   ```
   BETTER_AUTH_SECRET=<same as backend>
   DATABASE_URL=<same as backend>
   NEXT_PUBLIC_API_URL=https://your-railway-app.railway.app/api/v1
   ```
4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```
5. **Update CORS**: Go back to Railway and update `CORS_ORIGINS` with your Vercel URL

### Option 3: Render (All-in-One)

**Deploy both backend and frontend on Render:**

#### Deploy Backend

1. **Create Render Account**: https://render.com
2. **New Web Service**:
   - Connect GitHub repository
   - Root directory: `backend`
   - Build command: `pip install -r requirements.txt`
   - Start command: `alembic upgrade head && uvicorn src.main:app --host 0.0.0.0 --port $PORT`
3. **Add PostgreSQL Database**:
   - Create new PostgreSQL database in Render
   - Copy the Internal Database URL
4. **Environment Variables**:
   ```
   DATABASE_URL=<Internal Database URL from Render>
   BETTER_AUTH_SECRET=<generate with: openssl rand -hex 32>
   CORS_ORIGINS=https://your-frontend.onrender.com
   DEBUG=False
   PYTHON_VERSION=3.11.0
   ```

#### Deploy Frontend

1. **New Static Site** (or Web Service):
   - Connect GitHub repository
   - Root directory: `frontend`
   - Build command: `npm install && npm run build`
   - Publish directory: `.next`
2. **Environment Variables**:
   ```
   BETTER_AUTH_SECRET=<same as backend>
   DATABASE_URL=<same as backend>
   NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1
   ```

## Platform-Specific Guides

### Railway Deployment

Railway configuration is included in `backend/railway.json`:

```bash
cd backend
railway login
railway init --name todo-api
railway add --database postgresql
railway up
railway open  # Opens Railway dashboard
```

**Add environment variables** in Railway dashboard:
- `BETTER_AUTH_SECRET`: Generate with `openssl rand -hex 32`
- `CORS_ORIGINS`: Your frontend URL
- `DEBUG`: `False`

### Heroku Deployment

```bash
cd backend

# Create Heroku app
heroku create your-app-name

# Add PostgreSQL
heroku addons:create heroku-postgresql:mini

# Set environment variables
heroku config:set BETTER_AUTH_SECRET=$(openssl rand -hex 32)
heroku config:set CORS_ORIGINS=https://your-frontend.vercel.app
heroku config:set DEBUG=False

# Deploy
git push heroku 004-fullstack-web-app:main

# Run migrations
heroku run alembic upgrade head
```

### Fly.io Deployment

```bash
cd backend

# Install flyctl
curl -L https://fly.io/install.sh | sh

# Launch app
fly launch

# Set secrets
fly secrets set BETTER_AUTH_SECRET=$(openssl rand -hex 32)
fly secrets set CORS_ORIGINS=https://your-frontend.vercel.app
fly secrets set DEBUG=False

# Deploy
fly deploy
```

## Environment Variables Reference

### Backend Environment Variables

Required:
- `DATABASE_URL`: PostgreSQL connection string
- `BETTER_AUTH_SECRET`: Secret key for JWT (min 32 characters)
- `CORS_ORIGINS`: Comma-separated frontend URLs

Optional:
- `DEBUG`: `True` for development, `False` for production (default: `False`)

**Generate secure secret:**
```bash
openssl rand -hex 32
# or
python -c "import secrets; print(secrets.token_hex(32))"
```

### Frontend Environment Variables

Required:
- `BETTER_AUTH_SECRET`: Same as backend
- `DATABASE_URL`: Same as backend
- `NEXT_PUBLIC_API_URL`: Backend API URL with `/api/v1` suffix

## Database Setup

### PostgreSQL Providers

**Neon (Recommended - Free tier)**
1. Create account: https://neon.tech
2. Create new project
3. Copy connection string
4. Use as `DATABASE_URL`

**Railway**
- Automatic when you add PostgreSQL database
- Connection string provided as `DATABASE_URL`

**Render**
- Create PostgreSQL database
- Use Internal Database URL for backend

**Supabase**
1. Create project: https://supabase.com
2. Get connection string from Settings → Database
3. Use format: `postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres`

### Running Migrations

After deploying backend:

```bash
# Railway
railway run alembic upgrade head

# Heroku
heroku run alembic upgrade head

# Render (automatic in start command)
# Included in: alembic upgrade head && uvicorn...

# Manual/SSH
alembic upgrade head
```

## Testing Deployment

### Backend Health Check

```bash
# Check backend is running
curl https://your-backend-url.com/health

# Expected response:
# {"status":"healthy"}

# Check API docs
open https://your-backend-url.com/docs
```

### Frontend Check

```bash
# Open frontend
open https://your-frontend-url.com

# Should see landing page with Login/Register buttons
```

### Full Flow Test

1. **Register**: Create new account
2. **Login**: Sign in with credentials
3. **Create Task**: Add a new task
4. **View Tasks**: See task list
5. **Edit Task**: Update task details
6. **Complete Task**: Toggle completion
7. **Delete Task**: Remove task

## Troubleshooting

### Backend Issues

**"Could not connect to database"**
- Check `DATABASE_URL` is correct
- Ensure database is running
- Check firewall rules allow connection

**"CORS error"**
- Add frontend URL to `CORS_ORIGINS`
- Include protocol (https://)
- No trailing slash

**"Module not found"**
- Ensure all dependencies in `requirements.txt`
- Rebuild application

### Frontend Issues

**"API connection failed"**
- Check `NEXT_PUBLIC_API_URL` is correct
- Include `/api/v1` at the end
- Ensure backend is running

**"Unauthorized"**
- Check `BETTER_AUTH_SECRET` matches backend
- Clear browser cache/cookies

**"Environment variable not found"**
- Ensure all required env vars are set
- Restart application after adding env vars

## Security Checklist

Before going to production:

- [ ] Change `BETTER_AUTH_SECRET` to secure random string (min 32 chars)
- [ ] Set `DEBUG=False` in backend
- [ ] Use HTTPS for both frontend and backend
- [ ] Set proper `CORS_ORIGINS` (no wildcards in production)
- [ ] Use environment-specific database (not shared dev/prod)
- [ ] Enable database backups
- [ ] Set up monitoring and logging
- [ ] Review API rate limiting needs
- [ ] Check all `.env.example` files are not committed

## Monitoring & Logs

### Railway
```bash
railway logs
```

### Heroku
```bash
heroku logs --tail
```

### Render
- View logs in dashboard under "Logs" tab

### Vercel
```bash
vercel logs
```

## Scaling Considerations

### Backend Scaling
- **Vertical**: Increase server resources (RAM, CPU)
- **Horizontal**: Add multiple instances (requires load balancer)
- **Database**: Use connection pooling, read replicas

### Frontend Scaling
- Vercel/Netlify handle this automatically
- CDN for static assets
- Edge functions for dynamic content

## Cost Estimates

### Free Tier (Hobby Projects)
- **Backend**: Railway free tier (500 hours/month)
- **Frontend**: Vercel free tier (unlimited)
- **Database**: Neon free tier (0.5GB storage)
- **Total**: $0/month

### Production (Small App)
- **Backend**: Railway Pro ($5-10/month)
- **Frontend**: Vercel Pro ($20/month)
- **Database**: Neon Pro ($10-20/month)
- **Total**: ~$35-50/month

## Backup & Recovery

### Database Backups

**Railway/Render**: Automatic backups included

**Manual Backup**:
```bash
pg_dump $DATABASE_URL > backup.sql
```

**Restore**:
```bash
psql $DATABASE_URL < backup.sql
```

## Additional Resources

- [FastAPI Deployment](https://fastapi.tiangolo.com/deployment/)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Render Docs](https://render.com/docs)

---

**Need help?** Check the main README or open an issue on GitHub.
