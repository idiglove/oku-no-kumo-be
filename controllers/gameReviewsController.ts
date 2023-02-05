import { RequestHandler } from "express";

import { PrismaClient } from "@prisma/client";
import { create } from "domain";
const prisma = new PrismaClient();

export const addReview: RequestHandler = async (req, res) => {
    const gameId: number = Number(req.params.gameId);

    const { content, username } = req.body;

    // After implementation of login authentication we will have to extract username from bearer token in the authorization headers of requests that need authorization
    const createdReview: object = await prisma.review.create({
        data: {
            content: content,
            username: username,
            gameId: gameId,
        },
    });

    if (createdReview) {
        return res.status(201).send({
            heading: `Reivew has been created`,
            data: createdReview,
        });
    }

    return res.status(500).send({
        heading: "Server error",
        message: "Please try again.",
    });
};
