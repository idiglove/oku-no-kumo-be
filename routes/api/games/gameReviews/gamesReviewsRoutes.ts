import express, { Request, Response } from "express";

const gameReviewsRouter = express.Router({ mergeParams: true });

// reviews have comments and likes

gameReviewsRouter.get("/", (req: Request, res: Response) => {
    res.send(`get all reviews for product id ${req.params.gameId}`);
});

export default gameReviewsRouter;
