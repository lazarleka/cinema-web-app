const express = require("express");
const reservationRouter = express.Router();
const reservationController = require('../controllers/reservation-controller');

reservationRouter.route("/")
    .get(reservationController.getReservations)
    .post(reservationController.insertReservation);

reservationRouter.route("/:id")
    .get(reservationController.getReservationById)
    .put(reservationController.updateReservation)
    .delete(reservationController.deleteReservation);

module.exports = reservationRouter;