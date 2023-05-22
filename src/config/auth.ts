import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs'
import { PrismaClient, User } from '@prisma/client'

const prisma = new PrismaClient()

export function CreateToken(user: User){
    const token = jwt.sign({
        userId: user.id
    }, process.env.JWT_SECRET!)
    return token
}

export async function verifyToken(token: string): Promise<User> {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

 export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcryptjs.hash(password, saltRounds);
    return hashedPassword;
  }