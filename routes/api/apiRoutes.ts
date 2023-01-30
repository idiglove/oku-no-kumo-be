import express from "express";

import usersRouter from "./users/usersRoutes.js";
import gamesRouter from "./games/gamesRoutes.js";
import reviewsRouter from "./reviews/reviewsRoutes.js";

const apiRouter = express.Router();

apiRouter.use("/users", usersRouter);
apiRouter.use("/games", gamesRouter);
apiRouter.use("/reviews", reviewsRouter);

export default apiRouter;
