import { dataSource } from '@shared/infra/typeorm';

import Product from '@modules/products/typeorm/entities/Product';
import { In } from 'typeorm';

interface IFindProducts {
  id: string;
}

//Código Versão typeorm 0.3.x
export const ProductsRepository = dataSource.getRepository(Product).extend({
  async findByName(name: string): Promise<Product | null> {
    const product = await this.findOneBy({
      name,
    });
    return product;
  },
  async findAllByIds(products: IFindProducts[]): Promise<Product[] | null> {
    const productIds = products.map(product => product.id);
    const existsProducts = await this.find({
      where: { id: In(productIds) },
    });
    return existsProducts;
  },
});
