# NPM Scripts Documentation

This document explains all available npm scripts in the Employee Management System.

## 🚀 Development Scripts

### `npm run dev`
**Purpose**: Start both frontend and backend servers simultaneously for development.

**What it does**:
- Starts the backend server on port 8000
- Starts the frontend development server on port 3000
- Both servers run concurrently with live reload

**Usage**:
```bash
npm run dev
```

**Output**:
- Backend: `Server running at http://localhost:8000`
- Frontend: `Local: http://localhost:3000`

---

### `npm run server`
**Purpose**: Start only the backend server.

**What it does**:
- Changes to `crudbackend` directory
- Runs `npm start` (which executes `nodemon index.js`)
- Starts server with auto-restart on file changes

**Usage**:
```bash
npm run server
```

---

### `npm run client`
**Purpose**: Start only the frontend development server.

**What it does**:
- Changes to `crudfrontend` directory
- Runs `npm start` (React development server)
- Opens browser automatically to http://localhost:3000

**Usage**:
```bash
npm run client
```

---

## 📦 Installation Scripts

### `npm run install-all`
**Purpose**: Install dependencies for both frontend and backend.

**What it does**:
- Runs `npm run install-server`
- Then runs `npm run install-client`
- Ensures all project dependencies are installed

**Usage**:
```bash
npm run install-all
```

---

### `npm run install-server`
**Purpose**: Install only backend dependencies.

**What it does**:
- Changes to `crudbackend` directory
- Runs `npm install`

**Usage**:
```bash
npm run install-server
```

---

### `npm run install-client`
**Purpose**: Install only frontend dependencies.

**What it does**:
- Changes to `crudfrontend` directory
- Runs `npm install`

**Usage**:
```bash
npm run install-client
```

---

## 🏗️ Build Scripts

### `npm run build`
**Purpose**: Build the frontend for production.

**What it does**:
- Changes to `crudfrontend` directory
- Runs `npm run build`
- Creates optimized production build in `crudfrontend/build/`

**Usage**:
```bash
npm run build
```

**Output**: Production-ready files in `crudfrontend/build/`

---

## 🚀 Production Scripts

### `npm start`
**Purpose**: Start the application in production mode.

**What it does**:
- Changes to `crudbackend` directory
- Runs `npm start` (starts the backend server)
- In production, backend serves static frontend files

**Usage**:
```bash
npm start
```

**Note**: Requires `NODE_ENV=production` and built frontend files.

---

### `npm run heroku-postbuild`
**Purpose**: Heroku deployment script.

**What it does**:
- Runs `npm run install-all` to install all dependencies
- Runs `npm run build` to create production build
- Automatically executed by Heroku after deployment

**Usage**: Automatically triggered by Heroku (not run manually)

---

## 🔧 Script Dependencies

### Required Global Dependencies
- **Node.js**: v16 or higher
- **npm**: v8 or higher

### Project Dependencies
- **concurrently**: Runs multiple npm scripts simultaneously
- **nodemon**: Auto-restarts backend server on file changes

---

## 📋 Common Workflows

### First Time Setup
```bash
# 1. Install all dependencies
npm run install-all

# 2. Set up environment variables
# Copy .env.example to crudbackend/.env and configure

# 3. Start development
npm run dev
```

### Development Workflow
```bash
# Start both servers
npm run dev

# Or start individually
npm run server  # Terminal 1
npm run client  # Terminal 2
```

### Production Build
```bash
# Build frontend
npm run build

# Start production server
NODE_ENV=production npm start
```

### Deployment Preparation
```bash
# Install dependencies
npm run install-all

# Build for production
npm run build

# Test production build locally
NODE_ENV=production npm start
```

---

## 🐛 Troubleshooting Scripts

### Script Fails to Run
1. **Check Node.js version**: `node --version`
2. **Check npm version**: `npm --version`
3. **Clear npm cache**: `npm cache clean --force`
4. **Reinstall dependencies**: `npm run install-all`

### Port Already in Use
1. **Kill process on port 8000**: `npx kill-port 8000`
2. **Kill process on port 3000**: `npx kill-port 3000`
3. **Change port in .env file**

### Concurrently Issues
1. **Reinstall concurrently**: `npm install concurrently --save-dev`
2. **Check if both package.json files exist**
3. **Verify script paths are correct**

---

## 🔍 Script Debugging

### Enable Verbose Logging
```bash
# For npm scripts
npm run dev --verbose

# For individual debugging
DEBUG=* npm run server
```

### Check Script Execution
```bash
# List all available scripts
npm run

# Check package.json scripts
cat package.json | grep -A 10 "scripts"
```

---

## 📝 Custom Script Examples

### Add New Scripts
You can add custom scripts to the root `package.json`:

```json
{
  "scripts": {
    "test": "cd crudfrontend && npm test",
    "lint": "cd crudfrontend && npm run lint",
    "clean": "rm -rf crudfrontend/build && rm -rf node_modules",
    "reset": "npm run clean && npm run install-all"
  }
}
```

### Windows Batch Scripts
For Windows users, you can also use the provided `start-dev.bat` file:
- Double-click to run
- Automatically installs dependencies
- Starts both servers
- Shows helpful information

---

**Happy Coding! 🎉**