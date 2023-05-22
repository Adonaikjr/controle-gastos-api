import { Router } from "express";
import { userRoutes } from "./user.routes";
import { entradaRoutes } from "./entrada.routes";
import { despRoutes } from "./desp.routes";

export const routes = Router();

routes.use("/users", userRoutes);
routes.use("/entrada", entradaRoutes)
routes.use('/desp', despRoutes)
