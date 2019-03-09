/* eslint-disable no-unused-vars */
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const wishList = sequelize.define("wishList", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "userId",
      },
    },
    gameId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "games",
        key: "gameID",
      },
    },
    have: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    want: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    trade: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  });
  return wishList;
};
