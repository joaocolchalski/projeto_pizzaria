"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const isAuthenticated_1 = require("./middlewares/isAuthenticated");
const multer_2 = __importDefault(require("./config/multer"));
const CreateUserController_1 = require("./controllers/user/CreateUserController");
const AuthUserController_1 = require("./controllers/user/AuthUserController");
const DetailUserController_1 = require("./controllers/user/DetailUserController");
const CreateCategoryController_1 = require("./controllers/category/CreateCategoryController");
const ListCategoryController_1 = require("./controllers/category/ListCategoryController");
const CreateProductController_1 = require("./controllers/product/CreateProductController");
const ListProductsByCategoryController_1 = require("./controllers/product/ListProductsByCategoryController");
const CreateOrderController_1 = require("./controllers/order/CreateOrderController");
const DeleteOrderController_1 = require("./controllers/order/DeleteOrderController");
const CreateOrderProductController_1 = require("./controllers/order/CreateOrderProductController");
const DeleteOrderProductController_1 = require("./controllers/order/DeleteOrderProductController");
const SendOrderController_1 = require("./controllers/order/SendOrderController");
const ListOrdersIsNotDraftController_1 = require("./controllers/order/ListOrdersIsNotDraftController");
const DetailOrderController_1 = require("./controllers/order/DetailOrderController");
const FinishOrderController_1 = require("./controllers/order/FinishOrderController");
const router = (0, express_1.Router)();
exports.router = router;
const upload = (0, multer_1.default)(multer_2.default.upload('./tmp'));
//---ROTAS USER---//
router.post('/users', new CreateUserController_1.CreateUserController().handle);
router.post('/session', new AuthUserController_1.AuthUserController().handle);
router.get('/me', isAuthenticated_1.isAuthenticated, new DetailUserController_1.DetailUserController().handle);
//---ROTAS CATEGORY---//
router.post('/category', isAuthenticated_1.isAuthenticated, new CreateCategoryController_1.CreateCategotyController().handle);
router.get('/category', isAuthenticated_1.isAuthenticated, new ListCategoryController_1.ListCategoryController().handle);
//--ROTAS PRODUCT--//
/*router.post(
  '/product',
  isAuthenticated,
  upload.single('file'),
  new CreateProductController().handle
);*/
router.post('/product', isAuthenticated_1.isAuthenticated, new CreateProductController_1.CreateProductController().handle);
router.get('/category/product', isAuthenticated_1.isAuthenticated, new ListProductsByCategoryController_1.ListProductsByCategoryController().handle);
//--ROTAS ORDER--//
router.post('/order', isAuthenticated_1.isAuthenticated, new CreateOrderController_1.CreateOrderController().handle);
router.delete('/order', isAuthenticated_1.isAuthenticated, new DeleteOrderController_1.DeleteOrderController().handle);
router.post('/order/add', isAuthenticated_1.isAuthenticated, new CreateOrderProductController_1.CreateOrderProductController().handle);
router.delete('/order/remove', isAuthenticated_1.isAuthenticated, new DeleteOrderProductController_1.DeleteOrderProductController().handle);
router.put('/order/send', isAuthenticated_1.isAuthenticated, new SendOrderController_1.SendOrderController().handle);
router.get('/order', isAuthenticated_1.isAuthenticated, new ListOrdersIsNotDraftController_1.ListOrdersIsNotDraftController().handle);
router.get('/order/detail', isAuthenticated_1.isAuthenticated, new DetailOrderController_1.DetailOrderController().handle);
router.put('/order/finish', isAuthenticated_1.isAuthenticated, new FinishOrderController_1.FinishOrderController().handle);
