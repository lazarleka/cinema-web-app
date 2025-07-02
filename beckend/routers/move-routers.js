const express = require("express");
const moveRouter = express.Router();
const moveController = require('./../controllers/move-contorller');
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

moveRouter.post(
  "/",
  upload.fields([
    { name: "glavna_slika" },
    { name: "slika1" },
    { name: "slika2" },
    { name: "slika3" },
    { name: "slika4" },
    { name: "slika5" }
  ]),
  moveController.insertMove
);

moveRouter.route("/")
  .get(moveController.getMoves);

moveRouter.route("/:id")
  .get(moveController.getMoveById)
  .put(
    upload.fields([
      { name: "glavna_slika" },
      { name: "slika1" },
      { name: "slika2" },
      { name: "slika3" },
      { name: "slika4" },
      { name: "slika5" }
    ]),
    moveController.updateMove
  )
  .delete(moveController.deleteMove);

module.exports = moveRouter;
