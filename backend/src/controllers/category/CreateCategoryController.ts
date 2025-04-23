import { Request, Response } from 'express';
import { CreateCategoryService } from '../../services/category/CreateCategoryService';

class CreateCategotyController {
  async handle(req: Request, res: Response) {
    const { name } = req.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.execute({ name });

    return res.json(category);
  }
}

export { CreateCategotyController };
