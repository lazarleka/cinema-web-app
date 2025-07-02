const express = require("express");
const novostiRouter = express.Router();
const novostiController = require('../controllers/novosti-controller');
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public"));
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

novostiRouter.post(
  "/",
  upload.single("slika_path"),
  novostiController.createNovost
);

novostiRouter.route("/")
  .get(novostiController.getNovosti);

novostiRouter.route("/:id")
  .get(novostiController.getNovostById)
  .put(upload.single("slika_path"), novostiController.updateNovost)  
  .delete(novostiController.deleteNovost);

module.exports = novostiRouter;
