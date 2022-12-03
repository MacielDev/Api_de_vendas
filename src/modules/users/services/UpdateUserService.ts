import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const user = await UsersRepository.findById(id);
    if (!user) {
      throw new AppError('User not found');
    }
    const emailExists = await UsersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('Email already exists');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateUserService;
