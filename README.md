# Employee Management System

A comprehensive full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing employees with authentication, role-based access control, and leave management features.

## 🚀 Features

- **User Authentication**: Secure login/signup with JWT tokens
- **Role-Based Access Control**: Admin and Employee roles with different permissions
- **Employee Management**: CRUD operations for employee records
- **Leave Management**: Request and manage employee leaves
- **Responsive Design**: Modern UI built with React and Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback

## 🛠️ Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Toastify** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
employee_management/
├── crudbackend/                 # Backend server
│   ├── apis/                    # API route handlers
│   │   ├── addEmployee.js
│   │   ├── admin.js
│   │   ├── deleteEmployee.js
│   │   ├── editEmployee.js
│   │   ├── findAllEmployee.js
│   │   ├── getSingleEmployee.js
│   │   ├── leave.js
│   │   ├── signIn.js
│   │   └── signUp.js
│   ├── db/                      # Database configuration
│   │   └── connectDb.js
│   ├── middleware/              # Custom middleware
│   │   ├── adminMiddleware.js
│   │   ├── authmiddleware.js
│   │   └── checkRole.js
│   ├── models/                  # Mongoose models
│   │   ├── employee.js
│   │   ├── leaveRequest.js
│   │   └── user.js
│   ├── .env                     # Environment variables
│   ├── index.js                 # Server entry point
│   └── package.json
├── crudfrontend/                # Frontend React app
│   ├── public/                  # Static files
│   ├── src/                     # Source code
│   │   ├── components/          # Reusable components
│   │   ├── contexts/            # React contexts
│   │   ├── pages/               # Page components
│   │   ├── styles/              # CSS files
│   │   ├── lib/                 # Utility functions
│   │   └── App.js               # Main App component
│   └── package.json
├── package.json                 # Root package.json for scripts
└── README.md                    # This file
```

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MongoDB** (local installation or MongoDB Atlas account)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd employee_management
   ```

2. **Install dependencies for both frontend and backend**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `crudbackend` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/employee_management
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/employee_management
   
   JWT_SECRET=your_jwt_secret_key_here
   PORT=8000
   ```

4. **Start the development servers**
   ```bash
   npm run dev
   ```

   This will start both the backend server (port 8000) and frontend development server (port 3000) concurrently.

### Individual Commands

- **Start backend only**: `npm run server`
- **Start frontend only**: `npm run client`
- **Build frontend for production**: `npm run build`
- **Install backend dependencies**: `npm run install-server`
- **Install frontend dependencies**: `npm run install-client`

## 🔧 Configuration

### Backend Configuration

The backend server runs on port 8000 by default. You can change this in the `.env` file:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### Frontend Configuration

The frontend is configured to make API calls to `http://localhost:8000`. If you change the backend port, update the API base URL in your frontend configuration.

## 👥 User Roles

### Admin
- View all employees
- Add new employees
- Edit employee information
- Delete employees
- Manage leave requests

### Employee
- View their own profile
- Submit leave requests
- View leave request status

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:
- Tokens are stored in localStorage
- Protected routes require valid tokens
- Role-based access control for admin features

## 📱 API Endpoints

### Authentication
- `POST /signup` - User registration
- `POST /signin` - User login

### Employee Management
- `GET /employees` - Get all employees (Admin only)
- `POST /addemployee` - Add new employee (Admin only)
- `GET /employee/:id` - Get single employee
- `PUT /editemployee/:id` - Update employee (Admin only)
- `DELETE /deleteemployee/:id` - Delete employee (Admin only)

### Leave Management
- `POST /leave/request` - Submit leave request
- `GET /leave/requests` - Get leave requests
- `PUT /leave/approve/:id` - Approve/reject leave (Admin only)

## 🎨 UI Components

The frontend uses a modern component-based architecture with:
- Reusable UI components
- Context API for state management
- Responsive design with Tailwind CSS
- Toast notifications for user feedback

## 🧪 Testing

Run tests for the frontend:
```bash
cd crudfrontend
npm test
```

## 🚀 Deployment

See the [DEPLOYMENT.md](DEPLOYMENT.md) file for detailed deployment instructions for various platforms including:
- Heroku
- Vercel
- Netlify
- Railway
- Render

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or check your Atlas connection string
   - Verify the MONGODB_URI in your .env file

2. **Port Already in Use**
   - Change the PORT in your .env file
   - Kill the process using the port: `npx kill-port 8000`

3. **CORS Issues**
   - Ensure the backend CORS configuration allows your frontend URL
   - Check that API calls are made to the correct backend URL

4. **JWT Token Issues**
   - Clear localStorage and login again
   - Verify JWT_SECRET is set in your .env file

### Getting Help

If you encounter any issues:
1. Check the console for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are installed
4. Check that both frontend and backend servers are running

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Happy Coding! 🎉**