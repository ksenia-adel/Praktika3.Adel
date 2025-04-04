// Näide. Backend - Articles oli väga kasulik.

// Building Your First REST API with Node JS, Express, and Sequelize
// https://medium.com/@mtalhanasir96/building-your-first-rest-api-with-node-js-express-and-sequelize-b041f9910b8a

const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./config/database'); // sequelize connection

app.use(cors());
app.use(express.json());

// set custom headers
app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// auth routes (registration, login)
require('./routes/authRoutes')(app);

const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const commentRoutes = require('./routes/commentRoutes');
const activityRoutes = require('./routes/activityRoutes');

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/logs', activityRoutes);

// health check
app.get('/', function (req, res) {
  res.send('📚 BOOKS API is running');
});

// start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
