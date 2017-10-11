import {Request, Response, Router} from "express";
import {Greeter} from "../greeter";

const welcomeRouter: Router = Router();

welcomeRouter.get("/", (req, res) => {
    const greeter = new Greeter("Peter");
    res.send(greeter.greet());
});

export default welcomeRouter;
