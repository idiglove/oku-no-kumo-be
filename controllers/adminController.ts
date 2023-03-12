import bcrypt from "bcrypt";
import { PrismaClient, Prisma } from "@prisma/client";

import { RequestHandler, Request, Response, NextFunction } from "express";

import { createAccessToken } from "./utils/auth";

import {
    SERVER_ERR_OBJ,
    HEADING_SUCCESS_REGISTRATION,
    returnAuthSuccessObj,
    AUTH_ERR_PASS_INC_OBJ,
    AUTH_ERR_USER_NOT_REGISTERED_OBJ,
    AUTH_ERR_USER_NOT_REG_OR_NOT_ADMIN_OBJ,
} from "./utils/constants";

const prisma = new PrismaClient();

export const loginAdmin: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { emailOrUsername, password } = req.body;

    const userFound: Prisma.userCreateInput | null = await prisma.user
        .findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { email: emailOrUsername },
                            { username: emailOrUsername },
                        ],
                    },
                    { role: { in: ["admin", "community manager"] } },
                ],
            },
        })
        .then((resultingArray) => {
            if (resultingArray.length === 0) {
                return null;
            }

            return resultingArray[0];
        });

    if (!userFound) {
        return res.status(400).send(AUTH_ERR_USER_NOT_REG_OR_NOT_ADMIN_OBJ);
    }

    const hashFound = userFound.password;

    const isPasswordCorrect: boolean = bcrypt.compareSync(password, hashFound);

    if (!isPasswordCorrect) {
        return res.status(400).send(AUTH_ERR_PASS_INC_OBJ);
    }

    const { password: remove, ...userWithoutHash } = userFound;

    const token = createAccessToken(userWithoutHash);

    if (token === null) {
        return res.status(500).send(SERVER_ERR_OBJ);
    }

    return res.status(200).send(returnAuthSuccessObj(token));
};
