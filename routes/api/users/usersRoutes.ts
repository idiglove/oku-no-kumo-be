import express from "express";
import checkReqBodyHasProps from "../../../controllers/utils/validate.js";
import * as usersController from "../../../controllers/usersController.js";

const usersRouter = express.Router();

usersRouter.get("/", usersController.getAllUsers);

usersRouter.post(
    "/",
    checkReqBodyHasProps(
        "email",
        "username",
        "firstName",
        "lastName",
        "password"
    ),
    usersController.checkDuplicateEmail,
    usersController.registerUser
);

usersRouter.post(
    "/auth",
    checkReqBodyHasProps("emailOrUsername", "password"),
    usersController.loginUser
);

export default usersRouter;
