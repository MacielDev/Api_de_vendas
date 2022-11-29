import { Router } from 'express';
import ProductsController from '../controllers/ProductsController';
import ProductController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.post('/', productsController.create);

export default productsRouter;
