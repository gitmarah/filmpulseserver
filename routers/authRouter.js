import { Router } from "express";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.route('/')
    .post(authController.signin);

export default authRouter;