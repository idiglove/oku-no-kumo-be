import express, { Request, Response } from "express";

const reviewsRouter = express.Router();

reviewsRouter.get("/", (req: Request, res: Response) => {
    const request = req;

    res.send("You have acessed getting all reviews route");
});

export default reviewsRouter;
