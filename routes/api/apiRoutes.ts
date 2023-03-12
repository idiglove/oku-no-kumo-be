import express from "express";

import usersRouter from "./users/usersRoutes.js";
import gamesRouter from "./games/gamesRoutes.js";
import reviewsRouter from "./reviews/reviewsRoutes.js";
import adminRouter from "./admin/adminRoutes.js";

const apiRouter = express.Router();

apiRouter.use("/admin", adminRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/games", gamesRouter);
apiRouter.use("/reviews", reviewsRouter);

export default apiRouter;
