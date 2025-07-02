const prikazivanjaRepository = require('../repositories/prikazivanja-repository');
const getPrikazivanja = async (req, res) => {
  const prikazivanja = await prikazivanjaRepository.getPrikazivanja();
  res.send(prikazivanja);
};

const getPrikazivanjeById = async (req, res) => {
    const id = req.params.id;
    const prikazivanje = await prikazivanjaRepository.getPrikazivanjeById(id);
    
    res.send(prikazivanje);
    
};
const insertPrikazivanje = async (req, res) => {
    const prikazivanje = req.body;
    const newPrikazivanje = await prikazivanjaRepository.createPrikazivanje(prikazivanje);
    res.send(newPrikazivanje);
};
const updatePrikazivanje = async (req, res) => {
    const id = req.params.id;
    const prikazivanje = req.body;
    const updatedPrikazivanje = await prikazivanjaRepository.updatePrikazivanje(id, prikazivanje);
    
    res.send(updatedPrikazivanje);
    
};
const deletePrikazivanje = async (req, res) => {
    const id = req.params.id;
    const deletedPrikazivanje = await prikazivanjaRepository.deletePrikazivanje(id);
    
    res.send(deletedPrikazivanje);
    
};

const insertReservation = async (req, res) => {
  const { prikazivanjeId, sjedista, userId } = req.body;

  

 
    const rezultat = await prikazivanjaRepository.kreirajRezervaciju(
      prikazivanjeId,
      sjedista,
      userId
    );

    res.send(rezultat);
 
};

module.exports = {
    getPrikazivanja,
    getPrikazivanjeById,
    insertPrikazivanje,
    updatePrikazivanje,
    deletePrikazivanje,
    insertReservation,
};