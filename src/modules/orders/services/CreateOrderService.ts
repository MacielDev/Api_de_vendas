import { OrdersRepository } from './../typeorm/repositories/OrdersRepository';
import { CustomersRepository } from '@modules/customers/typeorm/repositories/CustomersRepository';
import { ProductsRepository } from '@modules/products/typeorm/repositories/ProductsRepository';
import AppError from '@shared/errors/AppError';
import Order from '../typeorm/entities/Order';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    //Precisaremos utilizar os seguintes repositorios:
    //OrdersRepository
    //customersRepository
    //productsRepository

    //Verificação se o cliente existe
    const customerExists = await CustomersRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError('Customer does not exist');
    }

    //Verificações com relação aos produtos :

    const existsProducts = await ProductsRepository.findAllByIds(products);
    if (!existsProducts?.length) {
      throw new AppError('Could not find products with the given ids.');
    }

    //Pegamos todos os ids dos produtos que possuimos
    const existsProductsIds = existsProducts.map(product => product.id);

    //Filtramos detro dos produtos solicitados, quais não estão dentro dos produtos retornados de nossa busca
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    //Caso não exista algum produto dentre os solicitados informa somente o id do primeiro produto não encontrado
    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find product: ${checkInexistentProducts[0].id}`,
      );
    }

    // Verificação se possuimos a quantidade solicitada do produto
    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(
          findedProduct => findedProduct.id === product.id,
        )[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity}
        is note available for ${quantityAvailable[0].id}`,
      );
    }

    //Montagem dos produtos solicitados pelo usuário após a checagem se existem e estão disponíveis na quantidade solicitada

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(
        productFinded => productFinded.id === product.id,
      )[0].price,
    }));

    const order = await OrdersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(
          findedProduct => findedProduct.id === product.id,
        )[0].quantity - product.quantity,
    }));
    await ProductsRepository.save(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
