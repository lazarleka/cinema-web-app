const {Model}=require('sequelize');
const dbConnection = require('./../config/db-config');

const getNovosti = async () => {
  const [results] = await dbConnection.query("SELECT * FROM novosti order by id desc");
  return results;
};

const getNovostById = async (id) => {
  const [results] = await dbConnection.query("SELECT * FROM novosti WHERE id = ?", {
    replacements: [id]
  });
  return results[0];
};

const createNovost = async (novost) => {
  const [results] = await dbConnection.query(
    `INSERT INTO novosti (naslov, sadrzaj, slika_path) VALUES (?, ?, ?)`,
    {
      replacements: [novost.naslov, novost.sadrzaj, novost.slika_path]
    }
  );
  return results;
};

const updateNovost = async (id, novost) => {
  const [results] = await dbConnection.query(
    `UPDATE novosti SET naslov=?, sadrzaj=?, slika_path=? WHERE id=?`,
    {
      replacements: [novost.naslov, novost.sadrzaj, novost.slika_path, id]
    }
  );
  return results;
};

const deleteNovost = async (id) => {
  const [results] = await dbConnection.query("DELETE FROM novosti WHERE id=?", {
    replacements: [id]
  });
  return results;
};

module.exports = {
  getNovosti,
  getNovostById,
  createNovost,
  updateNovost,
  deleteNovost
};
