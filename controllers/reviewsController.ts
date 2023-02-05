import { RequestHandler } from "express";

import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export const approveReview: RequestHandler = async (req, res) => {
    const reviewId: number = Number(req.params.reviewId);

    // TODO? Turn not found checker to middleware
    const alreadyApproved: boolean | undefined = await prisma.review
        .findUnique({
            where: { id: reviewId },
        })
        .then((foundReview) => foundReview?.isApproved);

    if (typeof alreadyApproved === "undefined") {
        return res.status(400).send({
            heading: `Review with id ${reviewId} not found.`,
        });
    }

    if (alreadyApproved) {
        return res.status(400).send({
            heading: `Review with id ${reviewId} has already been approved.`,
        });
    }

    const approvedReview : object = await prisma.review.update({
        where: { id: reviewId },
        data: {
            isApproved: true,
        },
    });

    if (approvedReview) {
        return res.status(201).send({
            heading: `Review with id ${reviewId} has been approved.`,
            data: approvedReview,
        });
    }

    return res.status(500).send({
        heading: "Server error",
        message: "Please try again.",
    });
};
