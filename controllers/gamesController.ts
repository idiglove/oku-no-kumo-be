import { PrismaClient, game } from "@prisma/client";
import { RequestHandler, Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();

import {
    SERVER_ERR_OBJ,
    generateSuccessGameCreatedResObj,
} from "./utils/constants";

export const addGame: RequestHandler = async (req: Request, res: Response) => {
    const { name, description } = req.body;

    const createdGame: game = await prisma.game.create({
        data: {
            name: name,
            description: description,
        },
    });

    if (createdGame) {
        return res
            .status(201)
            .send(generateSuccessGameCreatedResObj(createdGame));
    }

    return res.status(500).send(SERVER_ERR_OBJ);
};
