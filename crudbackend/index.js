require('dotenv').config();

const { authMiddleware } = require('./middleware/authmiddleware');
const { adminMiddleware } = require('./middleware/adminMiddleware');
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDb } = require('./db/connectDb');

const { addEmployee } = require('./apis/addEmployee');
const { editEmployee } = require('./apis/editEmployee');
const { getSingleEmployee } = require('./apis/getSingleEmployee');
const { FindAllEmployees } = require('./apis/findAllEmployee');
const { signup } = require('./apis/signUp');
const { signin } = require('./apis/signIn');
const { deleteEmployee } = require('./apis/deleteEmployee');

const leaveRoute = require('./apis/leave');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

connectDb()
  .then(() => console.log("DB connected."))
  .catch((err) => console.error("DB connection failed", err));

// Employee routes
app.get('/employees', authMiddleware, FindAllEmployees);
app.post('/addemployee', authMiddleware, adminMiddleware, addEmployee);
app.get('/employee/:id', authMiddleware, getSingleEmployee);
app.put('/editemployee/:id', authMiddleware, adminMiddleware, editEmployee);
app.delete('/deleteemployee/:email', authMiddleware, adminMiddleware, deleteEmployee);

app.post('/signup', signup);
app.post('/signin', signin);

app.get('/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome Admin.",
    user: req.user,
  });
});

// Leave routes
app.use('/leave', leaveRoute);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../crudfrontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../crudfrontend/build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
