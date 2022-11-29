import { dataSource } from '@shared/infra/typeorm';
import { Repository } from 'typeorm';

import Product from '../../entities/Product';

//Código Versão typeorm 0.3.x
export const ProductRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = this.findOneBy({
      name,
    });
    return product;
  },
});

//Código versão typeorm  0.2.x
// export class ProductRepository extends Repository<Product> {
//   public async findByName(name: string): Promise<Product | null> {
//     const product = this.findOne({
//       where: {
//         name,
//       },
//     });
//     return product;
//   }
// }
