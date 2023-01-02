import AppError from '@shared/errors/AppError';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { compare, hash } from 'bcryptjs';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string; //senha Anterior
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    //Busca o usuário com o id informado
    const user = await UsersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    //Busca o usuário com o e-mail informado
    const userUpdateEmail = await UsersRepository.findByEmail(email);

    // Verifica se existe algum outro usuário utilizando o e-mail informado
    if (userUpdateEmail && userUpdateEmail.id != user_id) {
      throw new AppError('User already exists with this email');
    }

    //Verifica se a nova senha e a senha antiga foram enviadas
    if (password && !old_password) {
      throw new AppError('old password is required');
    }

    //Verifica se a senha antiga enviada está correta
    if (password && !old_password) {
      const checkOldPassword = compare(old_password!, user.password); // Pode ser que dê erro por conta da tipagem
      if (!checkOldPassword) {
        throw new AppError('Old password does not match');
      }
      //Atualiza a senha antiga para a nova senha
      user.password = await hash(password, 8);
    }

    //atualiza nome e email
    user.name = name;
    user.email = email;

    // salva as atualizacoes do usuário
    await UsersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
