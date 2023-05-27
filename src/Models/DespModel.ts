import prisma from "../service";

export interface DespProps {
  valueDesp: number;
  description: string;
  userId: any;
}

export class DespModel {
  async createDesp(props: DespProps) {
    try {
      const result = await prisma.despesa.create({
        data: {
          valueDesp: props.valueDesp,
          description: props.description,
          userId: props.userId,
        },
      });
      return result;
    } catch (error) {
      throw new Error(`erro ao cadastrar. ${error}`);
    } finally {
      await prisma.$disconnect();
    }
  }
  async findById() {
    const allResult = await prisma.despesa.findMany();
    return allResult;
  }
}
