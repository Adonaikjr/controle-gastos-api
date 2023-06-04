import { Router } from "express";
import { authenticateToken } from "../middleware/auth";
import { entrada_controller } from "../controller/entrada_controller";

const entradaRoutes = Router();

const entradaController = new entrada_controller();

entradaRoutes.post("/", authenticateToken, entradaController.create);
entradaRoutes.get("/", authenticateToken, entradaController.show )
entradaRoutes.delete('/delete/:id', authenticateToken, entradaController.Delete)
export { entradaRoutes };
