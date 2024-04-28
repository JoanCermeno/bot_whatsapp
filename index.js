const express = require("express");
const app = express();
const router = require("./src/router");
const morgan = require("morgan");

require("dotenv").config();

// middleware
const cors = require("cors");
// App use
app.use(
  // Configurar el middleware de CORS para que permita solo las conexiones entrate de este host especifico
  cors({
    origin: process.env.VITE_APP_HOST,
  })
);
// esto es para ver logs http en la terminal
app.use(morgan("dev"));

const port = process.env.PORT || 6969;
app.use("/", router);

app.listen(port, function () {
  console.log(`App Runnin in: http://localhost:${port}`);
});
