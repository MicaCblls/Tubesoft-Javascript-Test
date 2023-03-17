const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const { conn } = require("./db");

const app = express();
app.use(cors());
// Log requests to the console.
app.use(logger("dev"));
// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Configurar el servidor para exponer archivos estáticos de React
app.use(express.static(path.join(__dirname, "../client/build")));

// Configurar el servidor para manejar todas las solicitudes que no sean para archivos estáticos de React
app.get("/*", (req, res) => {
  if (fs.existsSync(path.join(__dirname, "../client/build", "index.html"))) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  } else {
    res.sendFile(path.join(__dirname, "public", "build.html"));
  }
});

const PORT = process.env.PORT || 3000;

conn.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});
