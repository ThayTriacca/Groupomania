'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      iduser: {
        type: Sequelize.INTEGER,
        references: {
          model:'Users',
          key: 'id',
          as: 'iduser'
        }
      },
      content: {
        type: Sequelize.STRING
      },
      media: {
        type: Sequelize.STRING
      },
      postDate: {
        type: Sequelize.DATE
      },
      likes: {
        type: Sequelize.INTEGER
      },
      usersliked: {
        type: Sequelize.STRING
      },
      dislikes: {
        type: Sequelize.INTEGER
      },
      usersdisliked: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Posts');
  }
};