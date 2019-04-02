const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const uuid = require('uuid/v4');

module.exports = (sequelize) => {
  const user = sequelize.define('user', {
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
      validation: { isEmail: true },
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

      beforeBulkUpdate: (userData) => {
        const salt = bcrypt.genSaltSync();
        const updatedUserData = userData.attributes;
        updatedUserData.password = bcrypt.hashSync(updatedUserData.password, salt);
        return updatedUserData;
      },
    },
  });


  user.associate = models => {
    user.hasMany(models.inventory, { onDelete: 'cascade' });
    user.hasMany(models.game, {});
  };

  user.prototype.validatePassword = (password) => bcrypt.compareSync(
    password,
    this.password
  );

  user.sync();

  return user;
};
