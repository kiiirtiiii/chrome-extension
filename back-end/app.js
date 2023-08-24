// requiring environment variables
require('dotenv').config()

const express = require("express");
const http = require('http');
const app = express();
const cors = require("cors");
const parser = require("body-parser");
const scrap = require("./routes/scrapper");
const { errorHandler, urlHandler } = require("./middlewares/error-handler");

app.use(parser.json());

app.use(cors());

app.use("/api", scrap);

app.use(errorHandler);
app.use("*", urlHandler);

// creating a server
const server = http.createServer(app);
// starting a server
server.listen(process.env.PORT, () => console.log(`server is running @ ${process.env.HOST}:${process.env.PORT}`));

module.exports = { app };
