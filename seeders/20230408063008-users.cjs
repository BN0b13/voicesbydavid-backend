'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Users' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      email: 'davidilchertva@gmail.com',
      emailOriginal: 'davidilchertva@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 1,
      firstName: 'David',
      lastName: 'Ilchert',
      phone: '6158813399',
      billingAddress: JSON.stringify({
        firstName: 'David',
        lastName: 'Ilchert',
        addressOne: '1256 Selby Ave',
        addressTwo: '',
        city: 'St. Paul',
        state: 'MN',
        zipCode: 55104
      }),
      shippingAddress: JSON.stringify({
        firstName: 'David',
        lastName: 'Ilchert',
        addressOne: '1256 Selby Ave',
        addressTwo: '',
        city: 'St. Paul',
        state: 'MN',
        zipCode: 55104
      }),
      favorites: [0],
      subscriptions: [0],
      emailVerified: false,
      emailToken: null,
      passwordToken: null,
      credit: 0,
      themeId: 1,
      themeInverted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
