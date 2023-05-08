import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

import gameReviewsRouter from "./gameReviews/gamesReviewsRoutes";
import * as gamesController from "../../../controllers/gamesController";
import checkReqBodyHasProps from "../../../controllers/utils/validate";

const gamesRouter = express.Router();
const prisma = new PrismaClient();

gamesRouter.use("/:gameId/reviews", gameReviewsRouter);

// Games have

gamesRouter.get("/", gamesController.getGames);

gamesRouter.post(
    "/",
    checkReqBodyHasProps("name", "description"),
    gamesController.addGame
);

export default gamesRouter;
