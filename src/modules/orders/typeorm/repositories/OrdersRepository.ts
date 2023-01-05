import Customer from '@modules/customers/typeorm/entities/Customer';
import { dataSource } from '@shared/infra/typeorm';
import Order from '../entities/Order';

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

//Código Versão typeorm 0.3.x
export const OrdersRepository = dataSource.getRepository(Order).extend({
  async findById(id: string): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: {
        order_products: true,
        customer: true,
      },
    });
    return order;
  },
  async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      order_products: products,
    });
    await this.save(order);
    return order;
  },
});
