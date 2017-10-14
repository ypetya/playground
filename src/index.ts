
import * as bodyParser from "body-parser";
import * as express from "express";
import { Application } from "express";
import apiRouter from "./routes/api";
import * as serveStatic from "serve-static";

// initialize the webserver
const host = process.env.YOUR_HOST || "localhost";
const port = process.env.PORT || 8080;

const app: Application = express();

app.use(serveStatic(__dirname + "/../src/public"));

//app.use(bodyParser.json({ type: "application/json" }));
app.use("/api", apiRouter);

app.listen(port, host, () => {
    console.info(`App listening on port ${port}! ${__dirname}`);
});
