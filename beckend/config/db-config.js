const { Sequelize } = require('sequelize');

const dbConnection = new Sequelize('Bioskop_bar', 'root', 'lazar2004', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

module.exports = dbConnection;
