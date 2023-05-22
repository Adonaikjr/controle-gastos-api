import { Router } from "express";
import { user_controller } from "../controller/user_controller";
import { authenticateToken } from "../middleware/auth";

const userRoutes = Router();

const userController = new user_controller();

userRoutes.post("/", userController.createUser);
userRoutes.post("/login", userController.Session);
userRoutes.get("/", authenticateToken, userController.show);

export { userRoutes };
