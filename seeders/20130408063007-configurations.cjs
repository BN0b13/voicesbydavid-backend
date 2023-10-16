'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Configurations' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      themeId: 1,
      name: 'public',
      url: 'voicesbydavid.com',
      company: JSON.stringify({
        active: false,
        companyName: 'Voices By David',
        companyPhoneOn: false,
        companyPhone: null,
        companyPhoneExt: null,
        companyEmailOn: false,
        companyEmail: 'davidilchertva@gmail.com',
        companyShippingEmail: 'davidilchertva@gmail.com',
        companyShippingAddressOn: false,
        companyShippingAddress: {
          firstName: 'David',
          lastName: 'Ilchert',
          addressOne: '3400 Cottage Way',
          addressTwo: 'Ste G2 #18240',
          city: 'Sacramento',
          state: 'CA',
          zipCode: 95825
        },
        companyBillingAddress: {
          firstName: 'David',
          lastName: 'Ilchert',
          addressOne: '3400 Cottage Way',
          addressTwo: 'Ste G2 #18240',
          city: 'Sacramento',
          state: 'CA',
          zipCode: 95825
        },
      }),
      options: JSON.stringify({
        socialMedia: {
          facebook: {
            url: '',
            active: false
          },
          instagram: {
            url: '',
            active: false
          },
          twitter: {
            url: '',
            active: false
          },
          youtube: {
            url: '',
            active: false
          }
        }
      }),
      alerts: JSON.stringify({}),
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      themeId: 1,
      name: 'admin',
      url: 'admin.voicesbydavid.com',
      company: JSON.stringify({
        companyName: 'Voices By David',
        companyPhoneOn: false,
        companyPhone: null,
        companyPhoneExt: null,
        companyEmailOn: false,
        companyEmail: 'davidilchertva@gmail.com',
        companyShippingEmail: 'davidilchertva@gmail.com',
        companyShippingAddressOn: false,
        companyShippingAddress: {
          firstName: 'David',
          lastName: 'Ilchert',
          addressOne: '3400 Cottage Way',
          addressTwo: 'Ste G2 #18240',
          city: 'Sacramento',
          state: 'CA',
          zipCode: 95825
        },
        companyBillingAddress: {
          firstName: 'David',
          lastName: 'Ilchert',
          addressOne: '3400 Cottage Way',
          addressTwo: 'Ste G2 #18240',
          city: 'Sacramento',
          state: 'CA',
          zipCode: 95825
        },
      }),
      alerts: JSON.stringify({
        inventory: {
          inventoryCountOn: false,
          inventoryCountFrequency: 'monthly'
        }
      }),
      options: JSON.stringify({}),
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Roles', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};
