import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { desp_controller } from "../controller/desp_controller";
const despRoutes = Router();

const despController = new desp_controller()

despRoutes.post("/", authenticateToken, despController.create);
despRoutes.get("/", authenticateToken, despController.show);

export { despRoutes };
