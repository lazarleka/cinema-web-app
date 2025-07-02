const express = require("express");
const app = express();
const cors = require('cors');
const dbConnection = require('./config/db-config');
const moveRouter = require("./routers/move-routers");
const novostiRouter = require("./routers/novosti-routers");
const userRouter = require("./routers/user-routers");
const reservationRouter = require("./routers/reservation-routers");
const prikazivanjaRouter = require("./routers/prikazivanje-routers");
const salaRouter=require('./routers/sala-routers');
const multer = require('multer'); 


app.use(cors());
app.use(express.json());
app.use("/move", moveRouter);
app.use("/novosti", novostiRouter);
app.use("/register", userRouter);
app.use("/reservation", reservationRouter);
app.use("/prikazivanje", prikazivanjaRouter);
app.use("/", userRouter);
app.use("/sala",salaRouter);
dbConnection.authenticate()
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

app.use(express.static('./public'));


app.listen(3000, () => {
  console.log("Server radi na portu 3000");
});