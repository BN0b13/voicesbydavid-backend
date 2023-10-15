'use strict';
const table = { schema: process.env.PG_SCHEMA_NAME, tableName: 'Sections' };

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(table, [{
      type: 'welcome',
      url: '',
      title: 'Welcome to the Versatile World of David Ilchert',
      titleOn: true,
      subtitle: 'Professional Voice Over Artist',
      subtitleOn: true,
      paragraph: `Step into the captivating realm of voice artistry with David Ilchert, a seasoned voice actor whose passion and talent bring stories to life. With a specialization in narration, video games, animations, character voicing, and commercials, David's versatile vocal range knows no bounds. Whether you're crafting an epic adventure, breathing life into animated characters, or making your brand resonate, David's mastery of tone, emotion, and character will immerse your audience in a world of sonic wonder. Join us as we explore the limitless possibilities of voice, and let David Ilchert be the voice that tells your story, your way.`,
      paragraphOn: true,
      imagesOn: true,
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      type: 'about',
      url: '',
      title: '- About Me -',
      titleOn: true,
      subtitle: '',
      subtitleOn: false,
      paragraph: 'Please insert bio here.',
      paragraphOn: true,
      imagesOn: true,
      position: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], { schema: process.env.PG_SCHEMA_NAME });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Sections', null, { schema: process.env.PG_SCHEMA_NAME });
  }
};