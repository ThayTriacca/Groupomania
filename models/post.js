const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const post = sequelize.define('post', {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        iduser: {
          type: DataTypes.STRING,
          allowNull: false
        },
        content: {
          type: DataTypes.STRING,
          allowNull: false
        },
        media: {
          type: DataTypes.STRING,
          allowNull: true
        },
        postDate: {
          type: DataTypes.DATE,
          allowNull: false
        },
        likes: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
        }
});

module.exports = post;
