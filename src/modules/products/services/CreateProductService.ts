import AppError from '@shared/errors/AppError';
import Product from '@modules/products/typeorm/entities/Product';
import { ProductRepository } from '../typeorm/repositories/ProductRepository/Repository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

//Código typeORM  versão 0.3.x
class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await ProductRepository.findByName(name);
    if (productExists) {
      throw new AppError('There is already one product with this name');
    }
    const product = ProductRepository.create({
      name,
      price,
      quantity,
    });

    await ProductRepository.save(product);
    return product;
  }
}

export default CreateProductService;
