import express, { Request, Response } from "express";

import * as reviewsController from "../../../controllers/reivewsController.js";

import { isAdmin } from "../../../controllers/utils/auth.js";

const reviewsRouter = express.Router();

reviewsRouter.get("/", (req: Request, res: Response) => {
    const request = req;

    res.send("You have acessed getting all reviews route");
});

reviewsRouter.patch("/:reviewId/approve",
    isAdmin,
    reviewsController.approveReview
)

export default reviewsRouter;
