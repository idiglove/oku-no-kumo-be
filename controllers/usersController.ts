import * as validate from "./utils/validate.js";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

import { RequestHandler } from "express";

const prisma = new PrismaClient();

export const getAllUsers: RequestHandler = (req, res) => {
    res.send("hit get users route");
};

export const registerUser: RequestHandler = async (req, res) => {
    const { email, username, firstName, lastName, password } = req.body;

    const newUser = await prisma.user
        .create({
            data: {
                email,
                username,
                first_name: firstName,
                last_name: lastName,
                password: bcrypt.hashSync(password, 10),
            },
        })
        .then((createdUser: any) => {
            return createdUser;
        });

    if (newUser) {
        return res.json({
            heading: "Registration successful",
            message:
                "You can now log in using your registered email or username.",
        });
    } else {
        return res.status(500).send({
            heading: "Server error",
            message: "Please try again.",
        });
    }
};

export const checkDuplicateEmail: RequestHandler = async (req, res, next) => {
    const { email, username } = req.body;

    const resultEmail = await prisma.user.findUnique({
        where: { email: email },
        select: {
            email: true,
        },
    });

    const resultUsername = await prisma.user.findUnique({
        where: { username: username },
        select: {
            username: true,
        },
    });

    if (resultEmail || resultUsername) {
        return res.status(400).send({
            heading: "Duplicate email/username found",
            message: "Please login.",
        });
    }

    next();
};

export const loginUser: RequestHandler = (req, res) => {
    // Find user, get hashed password and use bcrypt to compare. We use sessions database to store user sesssions?
};
