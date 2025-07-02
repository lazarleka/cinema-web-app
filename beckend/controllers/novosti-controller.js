const novostiRepository = require("../repositories/novosti-repositories");

const getNovosti = async (req, res) => {
  const novosti = await novostiRepository.getNovosti();
  res.send(novosti);
};

const getNovostById = async (req, res) => {
  const id = req.params.id;
  const novost = await novostiRepository.getNovostById(id);
  res.send(novost);
};

const createNovost = async (req, res) => {
  const { naslov, sadrzaj } = req.body;
  const slika_path = "/" + req.file.filename;

  const novaNovost = await novostiRepository.createNovost({
    naslov,
    sadrzaj,
    slika_path
  });

  res.status(201).json(novaNovost);
};

const updateNovost = async (req, res) => {
  const id = req.params.id;
  const { naslov, sadrzaj } = req.body;
  const slika_path = "/" + req.file.filename;

  const updatedNovost = await novostiRepository.updateNovost(id, {
    naslov,
    sadrzaj,
    slika_path
  });

  res.send(updatedNovost);
};

const deleteNovost = async (req, res) => {
  const id = req.params.id;
  const deleted = await novostiRepository.deleteNovost(id);
  res.send(deleted);
};

module.exports = {
  getNovosti,
  getNovostById,
  createNovost,
  updateNovost,
  deleteNovost
};
