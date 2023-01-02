import { dataSource } from '@shared/infra/typeorm';
import Costumer from '../entities/Customer';

export const CustomersRepository = dataSource.getRepository(Costumer).extend({
  async findByName(name: string): Promise<Costumer | null> {
    const customer = await this.findOne({
      where: { name },
    });
    return customer;
  },

  async findById(id: string): Promise<Costumer | null> {
    const costumer = await this.findOne({
      where: { id },
    });
    return costumer;
  },

  async findByEmail(email: string): Promise<Costumer | null> {
    const costumer = await this.findOne({
      where: { email },
    });
    return costumer;
  },
});
