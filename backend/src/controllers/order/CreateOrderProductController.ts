import { Request, Response } from 'express';
import { CreateOrderProductService } from '../../services/order/CreateOrderProductService';

class CreateOrderProductController {
  async handle(req: Request, res: Response) {
    const { amount, order_id, product_id } = req.body;

    const createOrderProduct = new CreateOrderProductService();

    const orderProduct = await createOrderProduct.execute({
      amount,
      order_id,
      product_id,
    });

    return res.json(orderProduct);
  }
}

export { CreateOrderProductController };
