'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createSchema(process.env.PG_SCHEMA_NAME, {
      ifNotExists: true
    });
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      refId: {
        type: Sequelize.STRING
      },
      products: {
        type: Sequelize.JSONB
      },
      total: {
        type: Sequelize.INTEGER
      },
      billingAddress: {
        type: Sequelize.JSONB
      },
      shippingAddress: {
        type: Sequelize.JSONB
      },
      shippingId: {
        type: Sequelize.INTEGER
      },
      shippingTotal: {
        type: Sequelize.INTEGER
      },
      deliveryInsurance: {
        type: Sequelize.BOOLEAN
      },
      deliveryInsuranceTotal: {
        type: Sequelize.INTEGER
      },
      couponId: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      paid: {
        type: Sequelize.BOOLEAN
      },
      paymentLink: {
        type: Sequelize.STRING
      },
      fulfilledBy: {
        type: Sequelize.INTEGER
      },
      tracking: {
        type: Sequelize.STRING
      },
      notes: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Orders');
  }
};