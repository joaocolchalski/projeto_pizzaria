import { Response, Request } from 'express';
import { CreateProductService } from '../../services/product/CreateProductService';
import { UploadedFile } from 'express-fileupload';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,
  api_key: process.env.CLOUDNARY_KEY,
  api_secret: process.env.CLOUDNARY_SECRET,
});

class CreateProductController {
  async handle(req: Request, res: Response) {
    const { name, price, description, category_id } = req.body;

    const createProduct = new CreateProductService();

    if (!req.files || Object.keys(req.files).length === 0) {
      throw new Error('Precisa enviar uma imagem do produto!');
    } else {
      //const { filename: banner } = req.file; // filename: banner -> isso acaba renomeando a variável filename para banner

      const file = req.files['file'] as UploadedFile;

      const resultFile: UploadApiResponse = await new Promise(
        (resolve, reject) => {
          cloudinary.uploader
            .upload_stream({}, function (error, result) {
              if (error) {
                reject(error);
                return;
              }

              resolve(result);
            })
            .end(file.data);
        }
      );

      const product = await createProduct.execute({
        name,
        price,
        description,
        banner: resultFile.url,
        category_id,
      });

      return res.json(product);
    }
  }
}

export { CreateProductController };
