const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define('game', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    platform: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['PS4', 'XBox One', 'Switch']],
      },
    },
    region: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['USA', 'Japan', 'Europe']],
      },
    },
    publisher: DataTypes.STRING,
    version: DataTypes.STRING,
    upVotes: DataTypes.INTEGER,
    downVotes: DataTypes.INTEGER,
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isIn: [['requested', 'approved', 'denied']],
      },
    },
  },
  {
    hooks: {
      beforeCreate: (gameData) => {
        const updatedGameData = gameData;
        updatedGameData.status = 'requested';
        updatedGameData.upVotes = 0;
        updatedGameData.downVotes = 0;
        return updatedGameData;
      },
    },
  });

  game.associate = models => {
    game.belongsTo(models.user, { forgeinKey: { allowNull: false } });
    game.hasMany(models.inventory);
  };
  return game;
};
