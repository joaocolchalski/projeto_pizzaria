import { Request, Response } from 'express';
import { DeleteOrderProductService } from '../../services/order/DeleteOrderProductService';

class DeleteOrderProductController {
  async handle(req: Request, res: Response) {
    const order_product_id = req.query.order_product_id as string;

    const deleteOrderProduct = new DeleteOrderProductService();

    const orderProduct = await deleteOrderProduct.execute({ order_product_id });

    return res.json(orderProduct);
  }
}

export { DeleteOrderProductController };
