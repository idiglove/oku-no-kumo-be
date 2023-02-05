import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { RequestHandler, Request, Response, NextFunction } from "express";

import { createAccessToken } from "./utils/auth.js";

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
            heading: "Registration successful",
            message:
                "You can now log in using your registered email or username.",
        });
    }

    return res.status(500).send({
        heading: "Server error",
        message: "Please try again.",
    });
};

export const checkDuplicateEmail: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, username } = req.body;

    const resultEmail: object | null = await prisma.user.findUnique({
        where: { email: email },
        select: {
            email: true,
        },
    });

    const resultUsername: object | null = await prisma.user.findUnique({
        where: { username: username },
        select: {
            username: true,
        },
    });

    if (resultEmail !== null || resultUsername !== null) {
        return res.status(400).send({
            heading: "Duplicate email/username found",
            message: "Please login.",
        });
    }

    next();
};

export const loginUser: RequestHandler = async (
    req: Request,
    res: Response
) => {
    const { emailOrUsername, password } = req.body;

    type User = {
        email: string;
        username: string;
        first_name: string;
        last_name: string;
        password: string;
        role: string;
    };

    const userFoundByEmail: User | null = await prisma.user.findUnique({
        where: { email: emailOrUsername },
    });

    const userFoundByUsername: User | null = await prisma.user.findUnique({
        where: { username: emailOrUsername },
    });

    let hashFound: string;
    let user: User;

    if (userFoundByEmail !== null) {
        hashFound = userFoundByEmail.password;
        user = userFoundByEmail;
    } else if (userFoundByUsername !== null) {
        hashFound = userFoundByUsername.password;
        user = userFoundByUsername;
    } else {
        return res.status(400).send({
            heading: "Email or Username is not yet registered",
            message: "Please register first before logging in.",
        });
    }

    const isPasswordCorrect: boolean = bcrypt.compareSync(password, hashFound);

    if (!isPasswordCorrect) {
        return res.status(400).send({
            heading: "Password incorrect",
            message: "Please ensure that password is correct.",
        });
    }

    const { ["password"]: remove, ...userWithoutHash } = user;

    const token = createAccessToken(userWithoutHash);

    if (token === null) {
        return res.status(500).send({
            heading: "Server error",
            message: "Please try again.",
        });
    }

    return res.status(200).send({
        heading: "Successfully logged in",
        access: token,
    });
};
