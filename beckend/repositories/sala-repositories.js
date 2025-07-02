const dbConnection = require("../config/db-config");

const getSveSale = async () => {
  const [results] = await dbConnection.query("SELECT * FROM sala");
  return results;
};

module.exports = {
  getSveSale,
};
