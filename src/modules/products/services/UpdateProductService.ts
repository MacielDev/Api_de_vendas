import AppError from '@shared/errors/AppError';
import Product from '../typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository/Repository';

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
    const product = await ProductRepository.findOne({
      where: { id },
    });
    if (!product) {
      throw new AppError('This product not found');
    }

    const productExists = await ProductRepository.findByName(name);
    if (productExists && product.name !== name) {
      throw new AppError('Product already exists');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await ProductRepository.save(product);
    return product;
  }
}

export default UpdateProductService;
