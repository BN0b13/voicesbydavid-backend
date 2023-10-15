'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Categories' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      name: 'Narration',
      description: ``,
      type: '',
      thumbnailPath: '',
      thumbnailFilename: '',
      backSplashPath: '',
      backSplashFilename: '',
      details: JSON.stringify({
        furtherDetails: null
      }),
      status: false,
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Video Games',
      description: ``,
      type: '',
      thumbnailPath: '',
      thumbnailFilename: '',
      backSplashPath: '',
      backSplashFilename: '',
      details: JSON.stringify({
        furtherDetails: null
      }),
      status: false,
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Animations',
      description: ``,
      type: '',
      thumbnailPath: '',
      thumbnailFilename: '',
      backSplashPath: '',
      backSplashFilename: '',
      details: JSON.stringify({
        furtherDetails: null
      }),
      status: false,
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Character Voicing',
      description: ``,
      type: '',
      thumbnailPath: '',
      thumbnailFilename: '',
      backSplashPath: '',
      backSplashFilename: '',
      details: JSON.stringify({
        furtherDetails: null
      }),
      status: false,
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Commercials',
      description: ``,
      type: '',
      thumbnailPath: '',
      thumbnailFilename: '',
      backSplashPath: '',
      backSplashFilename: '',
      details: JSON.stringify({
        furtherDetails: null
      }),
      status: false,
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Categories', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};