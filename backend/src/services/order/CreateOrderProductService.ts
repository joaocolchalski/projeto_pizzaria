import prismaClient from '../../prisma';

interface OrderRequest {
  amount: number;
  order_id: string;
  product_id: string;
}

class CreateOrderProductService {
  async execute({ amount, order_id, product_id }: OrderRequest) {
    const orderProduct = await prismaClient.orderProduct.create({
      data: {
        amount,
        order_id,
        product_id,
      },
    });

    return orderProduct;
  }
}

export { CreateOrderProductService };
