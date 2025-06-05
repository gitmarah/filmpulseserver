import { Router } from "express"
import refreshController from "../controllers/refreshController.js";
const refreshRouter = Router();

refreshRouter.route('/')
    .get(refreshController)

export default refreshRouter;