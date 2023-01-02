import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import User from '../typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  userId: string;
}

class ShowProfileService {
  public async execute({ userId }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(userId);
    if (!user) {
      throw new AppError('user not found');
    }
    return user;
  }
}

export default ShowProfileService;
