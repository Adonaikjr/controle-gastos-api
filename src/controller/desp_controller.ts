import { Request, Response } from "express";
import { DespModel, DespProps } from "../Models/DespModel";

const despModel = new DespModel();
export class desp_controller {
  async create(req: Request, res: Response) {
    const { description, userId, valueDesp } = req.body as DespProps;
    try {
      const newDesp = await despModel.createDesp({
        valueDesp,
        description,
        userId,
      });
      return res.json({ newDesp });
      
    } catch (error) {
      throw new Error(`Erro ao gravar ${error}`);
    }
  }

  async show(req: Request, res: Response) {
    try {
      const result = await despModel.findById();

      return res.json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async Delete(req: Request, res: Response) {
    try {
      
    } catch (error) {
      
    }
  }
}
