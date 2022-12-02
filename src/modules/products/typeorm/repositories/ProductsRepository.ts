import { dataSource } from '@shared/infra/typeorm';

import Product from '@modules/products/typeorm/entities/Product';

//Código Versão typeorm 0.3.x
export const ProductsRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = this.findOneBy({
      name,
    });
    return product;
  },
});
