import bcrypt from "bcrypt";
import { PrismaClient, Prisma } from "@prisma/client";

import { RequestHandler, Request, Response, NextFunction } from "express";

import { createAccessToken } from "./utils/auth.js";

import {
    SERVER_ERR_OBJ,
    HEADING_SUCCESS_REGISTRATION,
} from "./utils/constants";

const prisma = new PrismaClient();

export const getAllUsers: RequestHandler = (req, res) => {
    res.send("hit get users route");
};

export const registerUser: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { email, username, firstName, lastName, password } = req.body;

    const newUser = await prisma.user.create({
        data: {
            email,
            username,
            first_name: firstName,
            last_name: lastName,
            password: bcrypt.hashSync(password, 10),
        },
    });

    if (newUser) {
        return res.json({
            heading: HEADING_SUCCESS_REGISTRATION,
            message:
                "You can now log in using your registered email or username.",
        });
    }

    return res.status(500).send(SERVER_ERR_OBJ);
};

export const checkDuplicateEmail: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, username } = req.body;

    const resultEmail: { email: string } | null = await prisma.user.findUnique({
        where: { email: email },
        select: {
            email: true,
        },
    });

    const resultUsername: { username: string } | null =
        await prisma.user.findUnique({
            where: { username: username },
            select: {
                username: true,
            },
        });

    if (resultEmail) {
        return res.status(400).send({
            heading: "Email already taken",
            message: "Please login or register using another email.",
        });
    }

    if (resultUsername) {
        return res.status(400).send({
            heading: "Username already taken",
            message: "Please login or register using another username.",
        });
    }

    next();
};

export const loginUser: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { emailOrUsername, password } = req.body;

    const userFound: Prisma.userCreateInput | null = await prisma.user
        .findMany({
            where: {
                OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
            },
        })
        .then((resultingArray) => {
            if (resultingArray.length === 0) {
                return null;
            }

            return resultingArray[0];
        });

    if (!userFound) {
        return res.status(400).send({
            heading: "Email or Username is not yet registered",
            message: "Please register first before logging in.",
        });
    }

    const hashFound = userFound.password;

    const isPasswordCorrect: boolean = bcrypt.compareSync(password, hashFound);

    if (!isPasswordCorrect) {
        return res.status(400).send({
            heading: "Password incorrect",
            message: "Please ensure that password is correct.",
        });
    }

    const { password: remove, ...userWithoutHash } = userFound;

    const token = createAccessToken(userWithoutHash);

    if (token === null) {
        return res.status(500).send(SERVER_ERR_OBJ);
    }

    return res.status(200).send({
        heading: "Successfully logged in",
        access: token,
    });
};
