import { Request, Response } from 'express';
import { CreateCategotyService } from '../../services/category/CreateCategoryService';

class CreateCategotyController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const createCategotyService = new CreateCategotyService();

    const category = await createCategotyService.execute({ name });

    return res.json(category);
  }
}

export { CreateCategotyController };
