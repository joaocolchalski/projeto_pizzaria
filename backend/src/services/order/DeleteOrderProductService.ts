import prismaClient from '../../prisma';

interface OrderRequest {
  order_product_id: string;
}

class DeleteOrderProductService {
  async execute({ order_product_id }: OrderRequest) {
    const orderProduct = await prismaClient.orderProduct.delete({
      where: {
        id: order_product_id,
      },
    });

    return orderProduct;
  }
}

export { DeleteOrderProductService };
