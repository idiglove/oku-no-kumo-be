import express from "express";
import checkReqBodyHasProps from "../../../../controllers/utils/validate";
import * as gameReviewsController from "../../../../controllers/gameReviewsController.js";

const gameReviewsRouter = express.Router({ mergeParams: true });

gameReviewsRouter.post(
    "/",
    checkReqBodyHasProps("username", "content"),
    gameReviewsController.addReview
);

// reviews have comments and likes

export default gameReviewsRouter;
