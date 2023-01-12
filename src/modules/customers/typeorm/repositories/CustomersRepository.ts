import { dataSource } from '@shared/infra/typeorm';
import Customer from '../entities/Customer';
import { pagination } from 'typeorm-pagination';

export const CustomersRepository = dataSource.getRepository(Customer).extend({
  async findByName(name: string): Promise<Customer | null> {
    const customer = await this.findOne({
      where: { name },
    });
    return customer;
  },

  async findById(id: string): Promise<Customer | null> {
    const costumer = await this.findOne({
      where: { id },
    });
    return costumer;
  },

  async findByEmail(email: string): Promise<Customer | null> {
    const costumer = await this.findOne({
      where: { email },
    });
    return costumer;
  },
});
