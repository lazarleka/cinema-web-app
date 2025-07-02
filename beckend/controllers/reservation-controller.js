const moveRepository = require('./../repositories/reservation-repositories');


const getReservations = async (req, res) => {    
    const novosti = await moveRepository.getReservations();
    res.send(novosti);
}

const getReservationById = async (req, res) => {
  const id = req.params.id;
  const rezervacije = await moveRepository.getReservationById(id);
  res.send(rezervacije);
};


const insertReservation = async (req, res) => {
    const novost = req.body;
    const newNovost = await moveRepository.createReservation(novost);
    res.send(newNovost);
}
const updateReservation = async (req, res) => {
    const id = req.params.id;
    const novost = req.body;
    const updatedNovost = await moveRepository.updateReservationt(id, novost);
   res.send(updatedNovost);
};

const deleteReservation = async (req, res) => {
    const id = req.params.id;
    const deletedNovost = await moveRepository.deleteReservation(id);
   
    res.send(deletedNovost);
   
};

module.exports = {
    getReservationById,
    getReservations,
    insertReservation,
    updateReservation,
    deleteReservation
};