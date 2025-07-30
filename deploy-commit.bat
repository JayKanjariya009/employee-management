@echo off
echo Preparing deployment commit...
echo.
echo Adding all changes to git...
git add .
echo.
echo Committing changes...
git commit -m "Fix deployment issues: case sensitivity, production scripts, environment variables, Express v5 compatibility"
echo.
echo Pushing to main branch...
git push origin main
echo.
echo ✅ Deployment commit complete!
echo.
echo Next steps:
echo 1. Go to your hosting platform (Render, Heroku, etc.)
echo 2. Trigger a new deployment or wait for auto-deploy
echo 3. Set environment variables:
echo    - MONGODB_URI=your_mongodb_atlas_connection_string
echo    - JWT_SECRET=your_jwt_secret_key
echo    - NODE_ENV=production
echo.
pause