const express=require("express");
const novostiRouter=express.Router();
const novostiController=require('./../controllers/novosti-controller');

novostiRouter.route("/")
    .get(novostiController.getNovosti)
    .post(novostiController.insertNovost);  
novostiRouter.route("/:id")
    .get(novostiController.getNovostById)
    .put(novostiController.updateNovost)
    .delete(novostiController.deleteNovost);