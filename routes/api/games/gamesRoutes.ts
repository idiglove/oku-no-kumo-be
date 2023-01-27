import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import gameReviewsRouter from "./gameReviews/gamesReviewsRoutes.js";

const gamesRouter = express.Router();
const prisma = new PrismaClient();

gamesRouter.use("/:gameId/reviews", gameReviewsRouter);

// Games have

gamesRouter.get("/", (req: Request, res: Response) => {
    res.send("hit get all games");
});

export default gamesRouter;
