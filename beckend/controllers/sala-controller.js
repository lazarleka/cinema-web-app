const salaRepository = require("../repositories/sala-repositories");

const getSveSale = async (req, res) => {
  const sale = await salaRepository.getSveSale();
  res.send(sale);
};

module.exports = {
  getSveSale,
};
