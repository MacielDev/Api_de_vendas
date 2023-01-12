import AppError from '@shared/errors/AppError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';

interface IRequest {
  id: string;
}

class DeleteProductService {
  public async execute({ id }: IRequest): Promise<void> {
    const product = await ProductsRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new AppError('Product not found');
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    ProductsRepository.remove(product);
  }
}

export default DeleteProductService;
