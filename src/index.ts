
import * as bodyParser from "body-parser";
import * as express from "express";
import { Application } from "express";
import * as serveStatic from "serve-static";
import Socket from "./socket";

// config
const host = process.env.YOUR_HOST || "localhost";
const port = process.env.PORT || 8080;

const app: Application = express();

// log
app.all('/', (req, res, next: Function) => {
    console.log(`${req.method} ${req.path} ${JSON.stringify(req.params)}`);
    next();
});

// static
app.use(serveStatic(__dirname + "/../src/public"));
app.use("/node_modules", serveStatic(__dirname + "/../node_modules"));
app.use("/client", serveStatic(__dirname + "/client"));

// serve
const server = app.listen(port, host, () => {
    console.info(`App listening on port ${port}! ${__dirname}`);
});

// socket
const socket = new Socket(server);