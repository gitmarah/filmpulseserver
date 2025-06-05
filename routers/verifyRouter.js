import { Router } from "express";
import verifyController from "../controllers/verifyController.js";

const verifyRouter = Router();

verifyRouter.route("/:token")
    .get(verifyController)

export default verifyRouter;