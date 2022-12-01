import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import CreateProductService from '../services/CreateProductService';
import DeleteProductService from '../services/DeleteProductService';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import UpdateProductService from '../services/UpdateProductService';
import { ProductRepository } from '../typeorm/repositories/ProductRepository/Repository';

export default class ProductController {
  //Listar Produtos
  public async index(request: Request, response: Response): Promise<Response> {
    const listProduct = new ListProductService();
    const products = await listProduct.execute();
    return response.json(products);
  }

  //Buscar Produto por Id
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showProduct = new ShowProductService();
    const product = await showProduct.execute({ id });
    return response.json(product);
  }

  //Criar Produto
  public async create(request: Request, response: Response) {
    const { name, price, quantity } = request.body;
    const createProduct = new CreateProductService();
    const product = await createProduct.execute({
      name,
      price,
      quantity,
    });
    await ProductRepository.save(product);
    return response.json(product);
  }

  //Atualizar Produto
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, price, quantity } = request.body;
    const updateProduct = new UpdateProductService();
    const product = await updateProduct.execute({
      id,
      name,
      price,
      quantity,
    });
    await ProductRepository.save(product);
    return response.json(product);
  }

  //Deletar Produto
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteProduct = new DeleteProductService();
    await deleteProduct.execute({ id });
    return response.json({ message: 'Product deleted successfully' });
  }
}
