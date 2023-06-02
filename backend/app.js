const { Sequelize } = require('sequelize');
const mysql = require('mysql');
const express = require('express');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const cors = require('cors');
const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const path = require('path');
const bodyParser = require('body-parser');
// require('dotenv').config();

const app = express();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


const db = new Sequelize('gpmdb', 'root', '1234', {
  host: 'localhost',
  dialect: 'mysql'
});

// const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'mysql'
// });

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
