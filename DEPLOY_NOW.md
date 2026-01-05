# 🚀 Deploy Your Todo App Now!

## One-Click Deployment (Recommended)

Click the button below to deploy your entire application to Render in minutes:

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/zareenarif/todo-app-phase-2)

## What Gets Deployed

When you click the deploy button, Render will automatically set up:

✅ **PostgreSQL Database** (Free tier)
- Fully managed database
- Automatic backups
- Connection string auto-configured

✅ **Backend API** (FastAPI)
- Python backend on `https://todo-api-xxxx.onrender.com`
- Auto-runs database migrations
- Health checks configured
- Environment variables set automatically

✅ **Frontend** (Next.js)
- React frontend on `https://todo-frontend-xxxx.onrender.com`
- Optimized production build
- Connected to backend API automatically
- SSL certificate included

## Deployment Steps

### Step 1: Click the Deploy Button
Click the "Deploy to Render" button above

### Step 2: Sign In
- Sign in with GitHub (takes 30 seconds)
- Authorize Render to access your repository

### Step 3: Configure (Optional)
- All settings are pre-configured in `render.yaml`
- You can customize service names if you want
- Or just click "Apply" to use defaults

### Step 4: Wait for Deployment
- Deployment takes 5-10 minutes
- Watch the progress in real-time
- All three services will deploy in parallel

### Step 5: Access Your App
Once deployment completes, you'll get URLs like:
- **Frontend**: `https://todo-frontend-xxxx.onrender.com`
- **Backend API**: `https://todo-api-xxxx.onrender.com`
- **Database**: Internal connection (auto-configured)

## Environment Variables

All environment variables are automatically configured:

**Backend:**
- `DATABASE_URL` - Auto-linked to PostgreSQL
- `BETTER_AUTH_SECRET` - Auto-generated secure secret
- `CORS_ORIGINS` - Auto-configured to allow frontend
- `DEBUG` - Set to `False` for production

**Frontend:**
- `NEXT_PUBLIC_API_URL` - Auto-linked to backend
- `BETTER_AUTH_SECRET` - Synced with backend
- `DATABASE_URL` - Auto-linked to database

## Free Tier Limits

Render free tier includes:
- 750 hours/month of runtime per service
- 100 GB bandwidth/month
- PostgreSQL database with 256 MB storage
- Automatic HTTPS/SSL

Perfect for development, testing, and small personal projects!

## After Deployment

Once deployed, you can:

1. **Register an account** on your frontend URL
2. **Create tasks** and test all features
3. **View API docs** at `https://your-api-url.onrender.com/docs`
4. **Monitor services** in the Render dashboard
5. **View logs** for debugging

## Alternative Deployment Options

If you prefer other platforms:

### Railway + Vercel
- Backend on Railway: https://railway.app
- Frontend on Vercel: https://vercel.com
- See `DEPLOYMENT.md` for detailed instructions

### Heroku
```bash
# Deploy backend
cd backend
heroku create your-app-name
heroku addons:create heroku-postgresql:mini
git push heroku 004-fullstack-web-app:main
```

### Fly.io
```bash
cd backend
flyctl launch
flyctl deploy
```

## Troubleshooting

**Deployment failed?**
- Check the build logs in Render dashboard
- Verify all files are pushed to GitHub
- Ensure `render.yaml` is at repository root

**Services not connecting?**
- Wait for all services to finish deploying
- Check environment variables in Render dashboard
- Verify CORS_ORIGINS includes frontend URL

**Database issues?**
- Ensure database service is running
- Check connection string is correct
- Verify migrations ran successfully

## Support

For deployment issues:
- Check `DEPLOYMENT.md` for detailed guides
- Review Render documentation: https://render.com/docs
- Open an issue on GitHub

---

**Ready to deploy? Click the button at the top of this page!**

🚀 Your app will be live in ~10 minutes!
