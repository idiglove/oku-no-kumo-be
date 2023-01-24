import express, { Request, Response } from "express";

import gameReviewsRouter from "./gameReviews/gamesReviewsRoutes.js";

const gamesRouter = express.Router();

gamesRouter.use("/:gameId/reviews", gameReviewsRouter);

// Games have

gamesRouter.get("/", (req: Request, res: Response) => {
    res.send("hit get all games");
});

export default gamesRouter;
