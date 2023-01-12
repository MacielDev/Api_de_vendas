import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await ProductsRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new AppError('This product not found');
    }

    const productExists = await ProductsRepository.findByName(name);
    if (productExists) {
      throw new AppError('Product already exists');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await ProductsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
