import { Request, Response } from 'express';
import { ListOrdersIsNotDraftService } from '../../services/order/ListOrdersIsNotDraftService';

class ListOrdersIsNotDraftController {
  async handle(req: Request, res: Response) {
    const listOrdersIsNotDraft = new ListOrdersIsNotDraftService();

    const orders = await listOrdersIsNotDraft.execute();

    return res.json(orders);
  }
}

export { ListOrdersIsNotDraftController };
