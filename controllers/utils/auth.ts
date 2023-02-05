import * as dotenv from "dotenv";
dotenv.config();

import { RequestHandler, Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

export const isAdmin: RequestHandler = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    /*  
        Verify if admin
        if not authorized, then
        return res.status(400).send({
        }) 
    */

    //if Admin then proceed to next middleware/controller
    next();
};

export const createAccessToken: Function = (user: object) => {
    const secret = process.env.secret;

    if (typeof secret !== "string") {
        return null;
    }

    return jwt.sign(user, secret, { expiresIn: "2d" });
};
