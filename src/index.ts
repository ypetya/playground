
import * as bodyParser from "body-parser";
import * as express from "express";
import {Application} from "express";
import welcomeRouter from "./routes/welcome";
import weatherRouter from "./routes/weather";

const app: Application = express();

app.use(bodyParser.json({type: "application/json"}));

// register routes to listen to and expose
app.use("/", welcomeRouter);
app.use("/api/weather", weatherRouter);

// initialize the webserver
const host = process.env.YOUR_HOST || "localhost";
const port = process.env.PORT || 8080;
app.listen(port, host, () => {
    console.info(`App listening on port ${port}!`);
});
