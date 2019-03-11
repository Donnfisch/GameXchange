/* eslint-disable no-unused-vars */
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const inventory = sequelize.define("inventory", {
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

  inventory.associate = models => {
    inventory.belongsTo(models.game, {
      forgeinKey: {
        allowNull: false,
      },
    });
    inventory.belongsTo(models.user, {
      forgeinKey: {
        allowNull: false,
      },
    });
  };

  return inventory;
};
