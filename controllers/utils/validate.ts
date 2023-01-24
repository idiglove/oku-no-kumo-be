import emailValidator from "email-validator";
import type { RequestHandler } from "express";

export const email = (email: string): boolean => {
    return emailValidator.validate(email);
};

interface ErrorObj {
    objHasProps: boolean;
    missing_props?: string;
    blank_props?: string;
}

export const checkObjHasProps = (
    reqBody: object,
    requiredProps: string[]
): ErrorObj => {
    let objHasProps: boolean = true;
    let missing_props: string[] = [];
    let blank_props: string[] = [];

    const isReqBodyEmpty = Object.keys(reqBody).length === 0;
    if (isReqBodyEmpty) {
        objHasProps = false;
        let returnObj: ErrorObj = {
            objHasProps,
            missing_props: requiredProps.join(", "),
        };
        return returnObj;
    }

    for (let prop of requiredProps) {
        const hasProp = Object.hasOwn(reqBody, prop);

        if (!hasProp) {
            objHasProps = false;
            missing_props.push(prop);
        }

        const propIsBlank =
            String(reqBody[prop as keyof typeof reqBody]).length === 0;

        if (propIsBlank) {
            objHasProps = false;
            blank_props.push(prop);
        }
    }

    let returnObj: ErrorObj = {
        objHasProps: objHasProps,
    };

    if (!objHasProps) {
        if (missing_props.length > 0) {
            returnObj.missing_props = missing_props.join(", ");
        }

        if (blank_props.length > 0) {
            returnObj.blank_props = blank_props.join(", ");
        }
    }

    return returnObj;
};

export const checkReqBodyHasProps = (
    ...requiredProps: string[]
): RequestHandler => {
    const middleware: RequestHandler = (req, res, next) => {
        const {
            objHasProps: reqBodyHasProps,
            missing_props,
            blank_props,
        }: ErrorObj = checkObjHasProps(req.body, requiredProps);

        if (!reqBodyHasProps) {
            return res.status(400).send({
                message: "Missing/blank fields",
                missing_props,
                blank_props,
            });
        }

        next();
    };

    return middleware;
};

export default checkReqBodyHasProps;
