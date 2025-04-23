import prismaClient from '../../prisma';

interface ProductRequest {
  category_id: string;
}

class ListProductsByCategoryService {
  async execute({ category_id }: ProductRequest) {
    const productsByCategory = await prismaClient.product.findMany({
      where: {
        category_id,
      },
    });

    return productsByCategory;
  }
}

export { ListProductsByCategoryService };
