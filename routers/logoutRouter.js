import { Router } from "express";
import logoutController from "../controllers/logoutController.js";
const logoutRouter = Router()

logoutRouter.route("/")
    .post(logoutController)

export default logoutRouter;