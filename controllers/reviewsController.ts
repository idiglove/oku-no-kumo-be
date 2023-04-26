import { RequestHandler, Request, Response } from "express";

import { PrismaClient, Prisma, review } from "@prisma/client";
const prisma = new PrismaClient();

import {
    SERVER_ERR_OBJ,
    generateSuccessApproveReviewResObj,
    generateReviewErrAlreadyApprovedResObj,
    generateReviewErrInvalidReviewIdResObj,
} from "./utils/constants";

export const approveReview: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const reviewId: number = Number(req.params.reviewId);

    // TODO? Turn not found checker to middleware
    const alreadyApproved: boolean | undefined = await prisma.review
        .findUnique({
            where: { id: reviewId },
        })
        .then((foundReview) => foundReview?.isApproved);

    if (typeof alreadyApproved === "undefined") {
        return res
            .status(400)
            .send(generateReviewErrInvalidReviewIdResObj(reviewId));
    }

    if (alreadyApproved) {
        return res
            .status(400)
            .send(generateReviewErrAlreadyApprovedResObj(reviewId));
    }

    const approvedReview: review = await prisma.review.update({
        where: { id: reviewId },
        data: {
            isApproved: true,
        },
    });

    if (approvedReview) {
        return res
            .status(201)
            .send(generateSuccessApproveReviewResObj(reviewId, approvedReview));
    }

    return res.status(500).send(SERVER_ERR_OBJ);
};



 export const deleteReview: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const reviewId: number = Number(req.params.reviewId);
     const deletedReview:review = await prisma.review.delete({
     where: { id: reviewId },

})
}