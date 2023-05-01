import express, { Request, Response } from "express";

import * as reviewsController from "../../../controllers/reviewsController";

import { isAdmin } from "../../../controllers/utils/auth";

const reviewsRouter = express.Router();

reviewsRouter.get("/", (req: Request, res: Response) => {
    const request = req;

    res.send("You have acessed getting all reviews route");
});

reviewsRouter.patch("/:reviewId/approve",
    isAdmin,
    reviewsController.approveReview
)
//added delete route
reviewsRouter.delete("/:reviewId/delete")

export default reviewsRouter;

