import { Request, Response } from "express";
import { ModelApp } from "../Models/ModelApp";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

const userModel = new ModelApp();

export class user_controller {
  async createUser(req: Request, res: Response) {
    const { name, email, password } = req.body as CreateUserRequest;

    try {
      const user = await userModel.createUser({ name, email, password });

      return res.status(201).json({ user });

    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async show(req: Request, res: Response) {
    try {
      const user = await userModel.findById();
      console.log(user);
      return res.json({ user });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
  async Session(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const newLogin = await userModel.Login({
        email,
        password,
      });
      return res.json(newLogin)
    } catch (error) {
      throw new Error(`erro: ${error}`)
    }
  }
  async updateAvatar(req: Request, res: Response) {
    const { userId } = req.body
    if (!req.file) {
      throw new Error('Error upload file')
    } else {
      try {
        const { originalname, filename: banner } = req.file;
        const result = await userModel.createImage({
          Image: banner,
          userId: parseInt(userId),
        })
        return res.json(result)
      } catch (error) {
        console.log(error)
      }

    }
  }
  async listImage(req: Request, res: Response) {
    try {
      const image = await userModel.findByImage()
      return res.json(image)
    } catch (error) {
      console.log(error)
    }
  }
}