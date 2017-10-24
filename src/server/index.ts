
import * as express from "express";
import { Application } from "express";
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
app.use(express.static(__dirname + "/../../public"));
app.use("/client", express.static(__dirname + "/../client"));
app.use("/require.js",express.static(__dirname + "/../../node_modules/requirejs/require.js"));

// serve
const server = app.listen(port, host, () => {
    console.info(`App listening on port ${port}! ${__dirname}`);
});

// socket
const socket = new Socket(server);