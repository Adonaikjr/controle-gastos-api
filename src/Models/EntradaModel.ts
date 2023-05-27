import prisma from "../service";

interface UserProps {
  value: number;
  description: string;
  userId: any;
}

export class EntradaModel {
  async createModel(userProps: UserProps) {
    try {
      const result = await prisma.entrada.create({
        data: {
          value: userProps.value,
          description: userProps.description,
          userId: userProps.userId,
        },
      });
      return result;
    } catch (error) {
      throw error
    } finally {
       prisma.$disconnect();
    }
  }
  async findById() {
    const allResult = await prisma.entrada.findMany();
    return allResult;
  }
}
