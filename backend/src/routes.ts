import { Router } from 'express';
import multer from 'multer';

import { isAuthenticated } from './middlewares/isAuthenticated';

import uploadConfig from './config/multer';

import { CreateUserController } from './controllers/user/CreateUserController';
import { AuthUserController } from './controllers/user/AuthUserController';
import { DetailUserController } from './controllers/user/DetailUserController';

import { CreateCategotyController } from './controllers/category/CreateCategoryController';
import { ListCategoryController } from './controllers/category/ListCategoryController';

import { CreateProductController } from './controllers/product/CreateProductController';
import { ListProductsByCategoryController } from './controllers/product/ListProductsByCategoryController';

import { CreateOrderController } from './controllers/order/CreateOrderController';
import { DeleteOrderController } from './controllers/order/DeleteOrderController';
import { CreateOrderProductController } from './controllers/order/CreateOrderProductController';
import { DeleteOrderProductController } from './controllers/order/DeleteOrderProductController';
import { SendOrderController } from './controllers/order/SendOrderController';
import { ListOrdersIsNotDraftController } from './controllers/order/ListOrdersIsNotDraftController';
import { DetailOrderController } from './controllers/order/DetailOrderController';
import { FinishOrderController } from './controllers/order/FinishOrderController';

const router = Router();

const upload = multer(uploadConfig.upload('./tmp'));

//---ROTAS USER---//
router.post('/users', new CreateUserController().handle);

router.post('/session', new AuthUserController().handle);

router.get('/me', isAuthenticated, new DetailUserController().handle);

//---ROTAS CATEGORY---//
router.post(
  '/category',
  isAuthenticated,
  new CreateCategotyController().handle
);
router.get('/category', isAuthenticated, new ListCategoryController().handle);

//--ROTAS PRODUCT--//
/*router.post(
  '/product',
  isAuthenticated,
  upload.single('file'),
  new CreateProductController().handle
);*/
router.post('/product', isAuthenticated, new CreateProductController().handle);
router.get(
  '/category/product',
  isAuthenticated,
  new ListProductsByCategoryController().handle
);

//--ROTAS ORDER--//
router.post('/order', isAuthenticated, new CreateOrderController().handle);
router.delete('/order', isAuthenticated, new DeleteOrderController().handle);
router.post(
  '/order/add',
  isAuthenticated,
  new CreateOrderProductController().handle
);
router.delete(
  '/order/remove',
  isAuthenticated,
  new DeleteOrderProductController().handle
);
router.put('/order/send', isAuthenticated, new SendOrderController().handle);
router.get(
  '/order',
  isAuthenticated,
  new ListOrdersIsNotDraftController().handle
);
router.get(
  '/order/detail',
  isAuthenticated,
  new DetailOrderController().handle
);
router.put(
  '/order/finish',
  isAuthenticated,
  new FinishOrderController().handle
);

export { router };
