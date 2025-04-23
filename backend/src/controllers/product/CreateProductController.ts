import { Response, Request } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProduct = new CreateProductService();

    if (!req.file) {
      throw new Error('Precisa enviar uma imagem do produto!');
    } else {
      const { filename: banner } = req.file; // filename: banner -> isso acaba renomeando a variável filename para banner

      const product = await createProduct.execute({
        name,
        price,
        description,
        banner,
        category_id,
      });

      return res.json(product);
    }
  }
}

export { CreateProductController };
