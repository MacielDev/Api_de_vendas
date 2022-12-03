import { Router } from 'express';
import UserController from '../controllers/UsersController';

const usersRouter = Router();
const usersController = new UserController();

usersRouter.get('/', usersController.index);

usersRouter.get('/:id', usersController.show);

usersRouter.post('/', usersController.create);

usersRouter.put('/:id', usersController.update);

usersRouter.delete('/:id', usersController.delete);

export default usersRouter;
