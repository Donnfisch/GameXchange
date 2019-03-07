"use strict";
var Sequelize = require("sequelize");
var bcrypt = require("bcrypt");

/*
  ? Is this where error handling (or at least messages) supposed to happen?
  ? In the event a user is attempting to register a name or email that is already in the db
  ? Sequelize does proper validation saving itself from breaking, but does not handle the error
  ? gracefully and I'm not sure where/how that would be done. Ultimately, it should flow to the 
  ? DOM to inform the user, but as of now breaks the server with "Unhandled rejection: Validation"
  ? Would like the server to keep running and handle appropriately.
*/
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    userId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4,16],
        isAlphanumeric: true,
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: { 
      type: Sequelize.STRING,
      allowNull:false,
      unique: true,
      validation: {
        isEmail: true
      }
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
      validation: {
        isAlpha: true,
        len: [1,20]
      }
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
      validation: {
        isAlpha: true,
        len: [1,30]
      }
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }
  ,
  {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
    }
  }
  );

  user.associate = function(models) {
    // associations can be defined here
  };

  // user.prototype.validatePassword = function(password) {
  //   return bcrypt.compareSync(
  //     password,
  //     this.password
  //   );
  // };

  user.sync();

  return user;
};