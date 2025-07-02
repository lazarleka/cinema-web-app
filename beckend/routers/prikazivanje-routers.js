const express= require("express");
const prikazivanjeRouter= express.Router();
const prikazivanjeController= require('../controllers/prikazivanje-controller');
prikazivanjeRouter.route("/")
    .get(prikazivanjeController.getPrikazivanja)
    .post(prikazivanjeController.insertPrikazivanje);
prikazivanjeRouter.route("/:id")
    .get(prikazivanjeController.getPrikazivanjeById)
    .put(prikazivanjeController.updatePrikazivanje)
    .delete(prikazivanjeController.deletePrikazivanje)
    .post(prikazivanjeController.insertReservation);
    
module.exports = prikazivanjeRouter;


