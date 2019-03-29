module.exports = {
  up: queryInterface => queryInterface.sequelize.query(`
    INSERT INTO inventories(userId,gameId,have,want,trade,createdAt,updatedAt)
    VALUES 
      ("5272e292-3c40-4eea-a3df-707b760fdf00",1,1,0,1,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",2,1,0,1,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",3,1,0,1,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",4,1,0,1,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",5,1,0,0,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",6,1,0,0,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",7,1,0,0,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",8,0,1,0,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",9,0,1,0,NOW(), NOW()),
      ("5272e292-3c40-4eea-a3df-707b760fdf00",10,0,1,0,NOW(), NOW()),

      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",1,0,1,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",2,0,1,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",3,0,0,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",4,0,0,0,NOW(), NOW()), 
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",5,0,0,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",6,0,0,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",7,0,0,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",8,0,0,0,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",9,1,0,1,NOW(), NOW()),
      ("cdd83e96-8cc7-40fc-a025-2680813c9c1a",10,1,0,1,NOW(), NOW()),

      ("bc86eb8e-1f8f-4062-8a5b-0c503e808898",1,1,0,1,NOW(), NOW()),
      ("bc86eb8e-1f8f-4062-8a5b-0c503e808898",2,1,0,1,NOW(), NOW()),
      ("bc86eb8e-1f8f-4062-8a5b-0c503e808898",3,1,0,1,NOW(), NOW()),
      ("bc86eb8e-1f8f-4062-8a5b-0c503e808898",4,1,0,1,NOW(), NOW()), 
      ("bc86eb8e-1f8f-4062-8a5b-0c503e808898",5,1,0,0,NOW(), NOW()),
      ("bc86eb8e-1f8f-4062-8a5b-0c503e808898",6,1,0,0,NOW(), NOW()),
      ("bc86eb8e-1f8f-4062-8a5b-0c503e808898",7,1,0,0,NOW(), NOW()),
      ("bc86eb8e-1f8f-4062-8a5b-0c503e808898",8,0,1,0,NOW(), NOW()),
      ("bc86eb8e-1f8f-4062-8a5b-0c503e808898",9,0,1,0,NOW(), NOW()),
      ("bc86eb8e-1f8f-4062-8a5b-0c503e808898",10,0,1,0,NOW(), NOW()),

      ("92ef2dcb-a2bf-418d-a007-c0ba12149073",1,0,1,0,NOW(), NOW()),
      ("92ef2dcb-a2bf-418d-a007-c0ba12149073",2,0,1,0,NOW(), NOW()),
      ("92ef2dcb-a2bf-418d-a007-c0ba12149073",3,0,1,0,NOW(), NOW()),
      ("92ef2dcb-a2bf-418d-a007-c0ba12149073",4,0,1,0,NOW(), NOW()), 
      ("92ef2dcb-a2bf-418d-a007-c0ba12149073",5,1,0,1,NOW(), NOW()),
      ("92ef2dcb-a2bf-418d-a007-c0ba12149073",6,1,0,1,NOW(), NOW()),
      ("92ef2dcb-a2bf-418d-a007-c0ba12149073",7,1,0,1,NOW(), NOW()),
      ("92ef2dcb-a2bf-418d-a007-c0ba12149073",8,1,0,1,NOW(), NOW()),
      ("92ef2dcb-a2bf-418d-a007-c0ba12149073",9,1,0,1,NOW(), NOW()),
      ("92ef2dcb-a2bf-418d-a007-c0ba12149073",10,1,0,1,NOW(), NOW());
  `),
};
