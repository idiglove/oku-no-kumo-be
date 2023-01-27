import { RequestHandler } from "express";

export const isAdmin: RequestHandler = (req: any, res: any, next: any) => {
    /*  
        Verify if admin
        if not authorized, then
        return res.status(400).send({
        }) 
    */

    //if Admin then proceed to next middleware/controller
    next();
};
