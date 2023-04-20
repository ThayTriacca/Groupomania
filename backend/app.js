const { Sequelize } = require('sequelize');
const mysql = require('mysql');
const express = require('express');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const path = require('path');

const app = express();

const db = new Sequelize('gpmdb', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

(async () => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

module.exports = { app, db };
