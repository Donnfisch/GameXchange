module.exports = {
  up: queryInterface => queryInterface.sequelize.query(`
    INSERT INTO inventories(userId,gameId,have,want,trade,createdAt,updatedAt)
    VALUES ("5272e292-3c40-4eea-a3df-707b760fdf00",1,1,0,1,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",2,1,0,1,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",3,0,1,1,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",4,0,1,1,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",5,0,1,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",1,0,1,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",2,0,1,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",3,1,1,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",4,1,1,0,NOW(), NOW()), 
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",5,1,1,0,NOW(), NOW());
  `),
};
