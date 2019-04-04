const models = require('../models');

module.exports = {
  up: () => {
    const fields = [
      {
        id: '5272e292-3c40-4eea-a3df-707b760fdf00',
        username: 'admin',
        password: 'password',
        email: 'admin@example.com',
        firstname: 'Admin',
        lastname: 'Admin',
        address: '1 Supply Closet',
        bio: 'Calm down, Marty, I didn’t disintegrate anything. The molecular structure of Einstein and the car are completely intact. Marty you gotta come back with me. Of course, from a group of Libyan Nationalists.',
        image: 'https://saturdaynightscreening.files.wordpress.com/2011/08/south-park-warcraft.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'cdd83e96-8cc7-40fc-a025-2680813c9c1a',
        username: 'JRule',
        password: 'password',
        email: 'jeffrey@irule.com',
        firstname: 'Ja',
        lastname: 'Rule',
        address: '23 Jordache Ct',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'bc86eb8e-1f8f-4062-8a5b-0c503e808898',
        username: 'SDog',
        password: 'password',
        email: 'snoop@doggydog.com',
        firstname: 'Snoop',
        lastname: 'Dogg',
        address: '93 Compton St',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '92ef2dcb-a2bf-418d-a007-c0ba12149073',
        username: 'DrDre',
        password: 'password',
        email: 'dre@aftermath.com',
        firstname: 'Doctor',
        lastname: 'Dre',
        address: '187 Inglewood Dr',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '62fdbc59-c414-42fb-94f1-49c9eb31fcaf',
        username: 'JDoe',
        password: 'password',
        email: 'test@example.com',
        firstname: 'John',
        lastname: 'Doe',
        address: '123 Fake Street',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        // Test uuid generation
        username: 'dfresh',
        password: 'password',
        email: 'dfresh@sixminutes.com',
        firstname: 'Doug',
        lastname: 'Fresh',
        address: '10 Summertime Street',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return models.user.bulkCreate(fields, { individualHooks: true });
  },

  down: (queryInterface) => queryInterface.dropTable('Users'),
};
