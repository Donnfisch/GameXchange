var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
  var game = sequelize.define("Game", {
    gameId: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    platform: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["PS4", "XBox One", "Nintento Switch"]]
      }
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["USA","Japan","Europe"]]
      }
    },
    publisher: DataTypes.STRING,
    version: DataTypes.STRING,
    requestedBy: {
      type: Sequelize.INTEGER,
      // allowNull: false,
      references: {
        model: "users", 
        key: "userId", 
      }
    },
    votes: DataTypes.INTEGER,
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [["requested","approved","denied"]]
      }
    }
  });
  return game;
};
