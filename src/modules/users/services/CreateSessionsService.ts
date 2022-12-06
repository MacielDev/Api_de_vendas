import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse{
//   user: User;
//   token: string;
// }

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const user = await UsersRepository.findByEmail(email);
    console.log(user);
    if (!user) {
      throw new AppError('Email or password incorrect', 401);
    }
    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('Email or password incorrect', 401);
    }
    return user;
  }
}

export default CreateSessionsService;
