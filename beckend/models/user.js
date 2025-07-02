const { DataTypes } = require('sequelize');
const db = require('../config/db-config');

const User = db.define('User', {
  username: { type: DataTypes.STRING, unique: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false }
});

module.exports = User;