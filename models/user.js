const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const uuid = require("uuid/v4");

/*
  ? Is this where error handling (or at least messages) supposed to happen?
  ? In the event a user is attempting to register a name or email that is already in the db
  ? Sequelize does proper validation saving itself from breaking, but does not handle the error
  ? gracefully and I'm not sure where/how that would be done. Ultimately, it should flow to the
  ? DOM to inform the user, but as of now breaks the server with "Unhandled rejection: Validation"
  ? Would like the server to keep running and handle appropriately.
*/

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define("user", {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 16],
        isAlphanumeric: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validation: {
        isEmail: true,
      },
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
      validation: {
        isAlpha: true,
        len: [1, 20],
      },
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validation: {
        isAlpha: true,
        len: [1, 30],
      },
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeCreate: (userData) => {
        const salt = bcrypt.genSaltSync();
        const updatedUserData = userData;
        if (!userData.id) updatedUserData.id = uuid();
        updatedUserData.password = bcrypt.hashSync(updatedUserData.password, salt);
        return updatedUserData;
      },

      beforeUpdate: (userData) => {
        const salt = bcrypt.genSaltSync();
        const updatedUserData = userData;
        updatedUserData.password = bcrypt.hashSync(updatedUserData.password, salt);
        return updatedUserData;
      },
    },
  });


  user.associate = models => {
    user.hasMany(models.inventory, { onDelete: "cascade" });
    user.hasMany(models.game, {});
  };

  user.prototype.validatePassword = function (password) {
    console.log(password);
    console.log(this.password);
    return bcrypt.compareSync(
      password,
      this.password
    );
  };

  user.sync();

  return user;
};
