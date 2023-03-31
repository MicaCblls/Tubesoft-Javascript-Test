const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const path = require("path");
const fs = require("fs");
const { conn } = require("./db");
const saveProductsInDB = require("./helpers/saveProductsInDB");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cart.routes");

const app = express();
const PORT = process.env.PORT || 3000;

//Middleware
app.use(cors());
// Log requests to the console.
app.use(logger("dev"));
//used to parse incoming requests with urlencoded payloads.
app.use(express.urlencoded({ extended: true }));
//used to parse incoming JSON payloads. The limit option specifies the maximum size of the payload to be accepted by the server.
app.use(express.json({ limit: "50mb" }));
//serves static files from the ../client/build directory using the express.static()middleware
app.use(express.static(path.join(__dirname, "../client/build")));

//adds headers to the server's responses, allowing cross-origin resource sharing (CORS) requests from any domain
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Routes
app.use(productRoutes);
app.use(cartRoutes);

// Configure the server to handle all requests other than for static React files
app.get("*", (req, res) => {
  if (fs.existsSync(path.join(__dirname, "../client/build", "index.html"))) {
    res.sendFile(path.join(__dirname, "../client/build", "index.html"));
  } else {
    res.sendFile(path.join(__dirname, "public", "build.html"));
  }
});

// Error catching endware.
app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

//server listen
conn.sync({ force: true }).then(async () => {
  await saveProductsInDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});
