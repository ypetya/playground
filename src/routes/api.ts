import {Request, Response, Router} from "express";

const apiRouter: Router = Router();

apiRouter.use("/", (req, res) => {
    res.send("ok");
});

export default apiRouter;
