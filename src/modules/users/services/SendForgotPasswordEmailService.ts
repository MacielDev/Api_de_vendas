import AppError from '@shared/errors/AppError';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const user = await UsersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('User does not exist');
    }

    const token = await UserTokensRepository.generate(user.id);
    console.log(user);
    //Por hora apenas iremos observar o token gerado - posteriormente iremos implementar o servico de envio
    // de e-mail
    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
