// require("./serverDB");
const express = require("express");
const http = require('http');
const app = express();
const cors = require("cors");
const { errorHandler, urlHandler } = require("./middlewares/error-handler");

const parser = require("body-parser");
app.use(parser.json());

const scrap = require("./routes/scrapper");

app.use(cors());

app.use("/api", scrap);

app.use(errorHandler);
app.use("*", urlHandler);

const host = "localhost";
const port = 4040;

const server = http.createServer(app);
server.listen(port, () => console.log(`server is running @ ${host}:${port}`));

module.exports = { app };
