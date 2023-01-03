import { CustomersRepository } from './../typeorm/repositories/CustomersRepository';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';

interface IRequest {
  name: string;
  email: string;
}

class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const emailExists = await CustomersRepository.findByEmail(email);
    if (emailExists) {
      throw new AppError('This email address already used.');
    }

    const customer = CustomersRepository.create({
      name,
      email,
    });

    await CustomersRepository.save(customer);
    return customer;
  }
}

export default CreateCustomerService;
