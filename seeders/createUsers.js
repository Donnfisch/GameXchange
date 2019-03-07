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
      username: "admin",
      password: "password",
      email: "admin@example.com",
      firstname: "Admin",
      lastname: "Admin",
      address: "1 Supply Closet",
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
      null, {}
    );
  }
};