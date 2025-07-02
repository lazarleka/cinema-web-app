const express = require("express");
const salaRouter = express.Router();
const salaController = require("../controllers/sala-controller");

salaRouter.get("/", salaController.getSveSale);

module.exports = salaRouter;
