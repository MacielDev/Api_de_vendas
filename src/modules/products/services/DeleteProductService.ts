import AppError from '@shared/errors/AppError';
import { ProductsRepository } from '../typeorm/repositories/ProductsRepository';

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
    ProductsRepository.remove(product);
  }
}

export default DeleteProductService;
