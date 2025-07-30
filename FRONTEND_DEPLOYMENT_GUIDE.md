# Frontend Deployment Guide

## Overview
Your frontend is now configured to automatically connect to your backend at `https://employee-management-ze76.onrender.com` when deployed in production.

## What We've Done

### 1. Environment Configuration
- Created `.env` file for development (uses localhost:8000)
- Created `.env.production` file for production (uses your Render backend URL)
- Created `src/config/api.js` to manage API base URL

### 2. Updated All API Calls
All axios calls in the following files have been updated to use the dynamic API URL:
- `src/pages/Add.js`
- `src/pages/EmpList.js`
- `src/pages/Edit.js`
- `src/pages/Leave.js`
- `src/pages/LeaveRequest.js`
- `src/pages/Manage.js`
- `src/pages/SignUP.js`
- `src/pages/SignIn.js`
- `src/pages/ManageLeaves.js`

### 3. Fixed Build Issues
- Downgraded Tailwind CSS from v4 to v3.4.17 for stability
- Fixed PostCSS configuration

## How It Works

### Development Mode
When you run `npm start`, it uses `.env` file:
```
REACT_APP_API_URL=http://localhost:8000
```

### Production Mode
When you run `npm run build`, it uses `.env.production` file:
```
REACT_APP_API_URL=https://employee-management-ze76.onrender.com
```

## Deployment Options

### Option 1: Deploy to Netlify (Recommended)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag and drop the `build` folder to Netlify
   - Or connect your GitHub repository for automatic deployments

3. **Configure Environment Variables (if needed):**
   - In Netlify dashboard, go to Site settings > Environment variables
   - Add: `REACT_APP_API_URL` = `https://employee-management-ze76.onrender.com`

### Option 2: Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables:**
   - In Vercel dashboard, go to Settings > Environment Variables
   - Add: `REACT_APP_API_URL` = `https://employee-management-ze76.onrender.com`

### Option 3: Deploy to Render (Static Site)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Create a new Static Site on Render:**
   - Go to [render.com](https://render.com)
   - Click "New" > "Static Site"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `build`

### Option 4: Deploy to GitHub Pages

1. **Install gh-pages:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json:**
   ```json
   {
     "homepage": "https://yourusername.github.io/your-repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
   }
   ```

3. **Deploy:**
   ```bash
   npm run deploy
   ```

## Testing the Connection

After deployment, test these features to ensure frontend-backend connection:
1. Sign up a new user
2. Sign in with existing credentials
3. Add a new employee (admin only)
4. View employee list
5. Edit employee details
6. Submit leave requests
7. Manage leave requests (admin only)

## Important Notes

1. **CORS Configuration:** Make sure your backend allows requests from your frontend domain
2. **HTTPS:** Your backend is already on HTTPS (Render), so the frontend will work properly
3. **Environment Variables:** The production build will automatically use the production API URL
4. **Build Verification:** Always test `npm run build` locally before deploying

## Troubleshooting

### If API calls fail after deployment:
1. Check browser console for CORS errors
2. Verify the backend URL is accessible
3. Check if environment variables are set correctly
4. Ensure the backend is running and accessible

### If build fails:
1. Run `npm install` to ensure all dependencies are installed
2. Check for any TypeScript or linting errors
3. Verify all import paths are correct

## File Structure
```
crudfrontend/
├── .env                    # Development environment (localhost)
├── .env.production         # Production environment (Render URL)
├── src/
│   ├── config/
│   │   └── api.js         # API configuration
│   └── pages/             # All pages updated with dynamic API URL
└── build/                 # Production build folder
```

Your frontend is now ready for deployment and will automatically connect to your backend at `https://employee-management-ze76.onrender.com` when deployed!