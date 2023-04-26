import { RequestHandler, Request, Response } from "express";

import { PrismaClient, review } from "@prisma/client";
import { create } from "domain";
const prisma = new PrismaClient();

import {
    SERVER_ERR_OBJ,
    generateSuccessAddReviewResObj,
} from "./utils/constants";

export const addReview: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const gameId: number = Number(req.params.gameId);

    const { content, username } = req.body;

    //TODO: Implement check for when game id does not exist on the game table

    // After implementation of login authentication we will have to extract username from bearer token in the authorization headers of requests that need authorization
    const createdReview: review = await prisma.review.create({
        data: {
            content: content,
            username: username,
            gameId: gameId,
        },
    });

    if (createdReview) {
        return res
            .status(201)
            .send(generateSuccessAddReviewResObj(createdReview));
    }

    return res.status(500).send(SERVER_ERR_OBJ);
};


