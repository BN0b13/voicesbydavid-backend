'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema(process.env.PG_SCHEMA_NAME, {
      ifNotExists: true
    });
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      emailOriginal: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      billingAddress: {
        type: Sequelize.JSONB
      },
      shippingAddress: {
        type: Sequelize.JSONB
      },
      favorites: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      subscriptions: {
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      emailVerified: {
        type: Sequelize.BOOLEAN
      },
      emailToken: {
        type: Sequelize.STRING
      },
      passwordToken: {
        type: Sequelize.STRING
      },
      credit: {
        type: Sequelize.INTEGER
      },
      themeId: {
        type: Sequelize.INTEGER
      },
      themeInverted: {
        type: Sequelize.BOOLEAN
      },
      eula: {
        type: Sequelize.BOOLEAN
      },
      eulaVersion: {
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
    }, { schema: process.env.PG_SCHEMA_NAME });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};