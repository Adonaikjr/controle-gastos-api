import { Router } from "express";
import { user_controller } from "../controller/user_controller";
import { authenticateToken } from "../middleware/auth";
import multer from "multer";
import uploadConfig from '../config/multer'
const userRoutes = Router();

const upload = multer(uploadConfig.upload('tmp'));
const userController = new user_controller();

userRoutes.post("/", userController.createUser);
userRoutes.post("/login", userController.Session);
userRoutes.get("/", authenticateToken, userController.show);
userRoutes.post('/avatar', upload.single('file'), userController.updateAvatar)
userRoutes.get('/avatar', userController.listImage)


export { userRoutes };
