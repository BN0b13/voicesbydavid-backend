'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Users' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      email: 'davidilchertva@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 1,
      firstName: 'David',
      lastName: 'Ilchert',
      phone: '6158813399',
      address: JSON.stringify({
        firstName: 'David',
        lastName: 'Ilchert',
        addressOne: '1256 Selby Ave',
        addressTwo: '',
        city: 'St. Paul',
        state: 'MN',
        zipCode: 55104
      }),
      emailVerified: false,
      emailToken: null,
      passwordToken: null,
      themeId: 1,
      themeInverted: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'noblenotes1@gmail.com',
      password: '$2b$10$hy7nBdBl81u9N.qBJnILNuC3zoiVWA.AlrJWVS4Z4EDSeL5iEW8/m',
      roleId: 1,
      firstName: 'Blake',
      lastName: 'Noble',
      phone: '6158813399',
      address: JSON.stringify({
        firstName: 'Blake',
        lastName: 'Noble',
        addressOne: '1256 Selby Ave',
        addressTwo: '',
        city: 'St. Paul',
        state: 'MN',
        zipCode: 55104
      }),
      emailVerified: false,
      emailToken: null,
      passwordToken: null,
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
