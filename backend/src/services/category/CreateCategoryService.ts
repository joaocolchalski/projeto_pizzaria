import prismaClient from '../../prisma';

interface CategoryRequest {
  name: string;
}

class CreateCategotyService {
  async execute({ name }: CategoryRequest) {
    if (name.trim().length === 0) {
      throw new Error('Nome inválido!');
    }

    const category = await prismaClient.category.create({
      data: {
        name,
      },
      select: {
        id: true,
        name: true,
      },
    });

    return category;
  }
}

export { CreateCategotyService };
