import express from "express";
import checkReqBodyHasProps from "../../../controllers/utils/validate.js";
import * as adminController from "../../../controllers/adminController";

const adminRouter = express.Router();

adminRouter.post(
    "/auth",
    checkReqBodyHasProps("emailOrUsername", "password"),
    adminController.loginAdmin
);

export default adminRouter;
