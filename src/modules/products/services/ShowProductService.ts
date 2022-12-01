import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository/Repository';

interface IRequest {
  id: string;
}

class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await ProductRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new AppError('Product not found');
    }
    return product;
  }
}

export default ShowProductService;
