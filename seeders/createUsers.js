const models = require("../models");

module.exports = {
  up: () => {
    const fields = {
      username: "admin",
      password: "password",
      email: "admin@example.com",
      firstname: "Admin",
      lastname: "Admin",
      address: "1 Supply Closet",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return models.user.create(fields);
  },
};
