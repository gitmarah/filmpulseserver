import { Router } from "express"
import authController from "../controllers/authController.js";
import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const signUpRouter = Router()

signUpRouter.post('/',upload.single("profilephoto"), authController.signup);

export default signUpRouter;