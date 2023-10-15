'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'SectionImages' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      table,
      'sectionId', 
      {
        type: Sequelize.INTEGER,
        references: { model: 'Sections', key: 'id'},
        allowNull: false
      },
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn(
      table,
      'sectionId', 
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }, 
      { 
        schema: process.env.PG_SCHEMA_NAME 
      });
  }
};