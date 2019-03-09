// "use strict";
const models = require("../models");


module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const fields = {
      username: "DrDre",
      password: "stillDRE",
      email: "dre@aftermath.com",
      firstname: "Doctor",
      lastname: "Dre",
      address: "187 Inglewood Dr",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return models.user.create(fields).then(() => {
      console.log("user created");
    });
  },

  down: (queryInterface, Sequelize) => 
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
     queryInterface.bulkDelete(
      "user",
      null,
      {}
    )
  ,
};
