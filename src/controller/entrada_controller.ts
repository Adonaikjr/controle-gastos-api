import { EntradaModel } from "./../Models/EntradaModel";
import { Request, Response } from "express";

interface TypeCreateEntrada {
  value: number;
  description: string;
  userId: any;
}
const entradaModel = new EntradaModel()
export class entrada_controller {
  async create(req: Request, res: Response) {
    const { value, description, userId } = req.body as TypeCreateEntrada;

    try {
      const entrada = await entradaModel.createModel({
        description,
        userId,
        value
      });
      return res.json({ entrada });
    } catch (error) {
      return res.status(500).json({ error: "Não foi possível gravar a entrada." });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const result = await entradaModel.findById();

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
