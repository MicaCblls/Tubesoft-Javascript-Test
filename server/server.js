const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const { conn } = require("./db");

app.use(cors());
// Log requests to the console.
app.use(logger("dev"));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar el servidor para exponer archivos estáticos de React
app.use(express.static(path.join(__dirname, "../client/build")));

// Configurar el servidor para manejar todas las solicitudes que no sean para archivos estáticos de React
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

conn.sync({ force: false }).then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});
