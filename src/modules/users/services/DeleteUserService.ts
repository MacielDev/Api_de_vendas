import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<void> {
    const user = await UsersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }
    UsersRepository.remove(user);
  }
}

export default DeleteUserService;
