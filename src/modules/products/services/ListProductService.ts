import { ProductRepository } from './../typeorm/repositories/ProductRepository/Repository';
import Product from '../typeorm/entities/Product';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const products = await ProductRepository.find();
    return products;
  }
}

export default ListProductService;
