// requiring environment variables
require('dotenv').config()

const express = require("express");
const http = require('http');
const app = express();
const cors = require("cors");
const routes = require("./routes/chrome_extension");
const { errorHandler, urlHandler } = require("./middlewares/error-handler");

app.use(express.json());
app.use(cors());
app.use('/api', routes);

// global error handlers
app.use(errorHandler);
app.all("*", urlHandler);

// creating a server
const server = http.createServer(app);
// starting a server
server.listen(process.env.PORT, () => console.log(`server is running @ ${process.env.HOST}:${process.env.PORT}`));

module.exports = { app };
