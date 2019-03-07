/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
"use strict";
var models = require("../models");


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
    var fields = {
      username: "JRule",
      password: "imonfyre",
      email: "jeffrey@irule.com",
      firstname: "Ja",
      lastname: "Rule",
      address: "23 Jordache Ct",
      createdAt: new Date(),
      updatedAt: new Date()
    };
    return models.user.create(fields).then(() => {
      console.log("user created");
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete(
      "user",
      null,
      {}
    );
  }
};