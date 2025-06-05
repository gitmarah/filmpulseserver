import { Router } from "express";
import userController from "../controllers/userController.js";
import multer from "multer";
const usersRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

usersRouter.route("/")
    .get(userController.getUsers)
    .delete(userController.deleteUser)
    .post(upload.single("profilephoto"), userController.updateUser);

usersRouter.post("/admin", userController.makeAdmin);

usersRouter.get("/:id", userController.getUser);

export default usersRouter;