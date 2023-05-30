import jwt from "jsonwebtoken";
import prisma from "../service";
import { hashPassword, CreateToken, verifyToken } from "../config/auth";
import bcryptjs from "bcryptjs";

interface UserProps {
  name: string;
  email: string;
  password: string;
}
interface typePropsLogin {
  email: string;
  password: string;
}
interface typePropsImage {
  userId: number
  Image: string

}
export class ModelApp {
  async createUser(userProps: UserProps) {
    const hashedPass = await hashPassword(userProps.password);
  
    try {
      const result = await prisma.user.create({
        data: {
          name: userProps.name,
          email: userProps.email,
          password: hashedPass,
        },
      });
      const token = CreateToken(result);
      return token;
    } catch (error) {
      throw new Error(`Unable to create user.${error}`);
    } finally {
      await prisma.$disconnect()
    }
  }

  async findById() {
    const users = await prisma.user.findMany();
    return users;
  }

  async Login({ email, password }: typePropsLogin) {
    try {
      const login = await prisma.user.findUnique({ where: { email } });

      if (login !== null) {
        const checkedPassword = await bcryptjs.compare(
          password,
          login.password
        );
        if (checkedPassword) {
          const token = jwt.sign({ userId: login.id }, process.env.JWT_SECRET!);
          return {
            token,
            user: login,
          };
        }
      }
    } catch (error) {
      throw new Error("email ou senha invalidos");
    } finally {
      await prisma.$disconnect();
    }
  }


  async findByImage() {
    const image = await prisma.image.findMany()
    return image
  }

  async createImage(props: typePropsImage) {
    try {
      const result = await prisma.image.create({
        data: {
          userId: props.userId,
          Image: props.Image
        },
      });
      return result;
    } catch (error) {
      throw new Error(`Erro ao cadastrar.${error}`);
    } finally {
      await prisma.$disconnect()
    }
  }
}
