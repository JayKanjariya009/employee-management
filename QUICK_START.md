# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Install Dependencies
```bash
npm run install-all
```

### 2. Set Up Environment Variables
1. Copy `.env.example` to `crudbackend/.env`
2. Update the values in `crudbackend/.env`:
   ```env
   MONGODB_URI=mongodb://localhost:27017/employee_management
   JWT_SECRET=your_secret_key_here
   PORT=8000
   ```

### 3. Start Development Servers
```bash
npm run dev
```

This will start:
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:3000

### 4. Alternative: Use the Batch File (Windows)
Double-click `start-dev.bat` to automatically install dependencies and start both servers.

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run server` | Start backend only |
| `npm run client` | Start frontend only |
| `npm run build` | Build frontend for production |
| `npm run install-all` | Install all dependencies |

## 🔧 Default Login Credentials

After starting the application, you can create an admin account through the signup process, or use these test credentials if they exist in your database:

- **Admin**: admin@example.com / password123
- **Employee**: employee@example.com / password123

## 🌐 Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: Check the README.md for endpoint details

## ❗ Troubleshooting

1. **Port already in use**: Change PORT in `.env` file
2. **MongoDB connection error**: Ensure MongoDB is running or check connection string
3. **Dependencies issues**: Run `npm run install-all` again

## 🚀 Ready to Deploy?

Check out `DEPLOYMENT.md` for detailed deployment instructions on various platforms!