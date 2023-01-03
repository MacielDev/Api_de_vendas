import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';
import ListCustomerService from '../services/ListCustomerService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';

export default class CustomersController {
  //Listar Customers
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomer = new ListCustomerService();
    const customers = await listCustomer.execute();
    return response.json(customers);
  }

  //Buscar Customer por Id
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showCustomer = new ShowCustomerService();
    const customer = await showCustomer.execute({ id });
    return response.json(customer);
  }

  //Criar Customer
  public async create(request: Request, response: Response) {
    const { name, email } = request.body;
    const createCustomer = new CreateCustomerService();
    const customer = await createCustomer.execute({
      name,
      email,
    });
    return response.json(customer);
  }

  //Atualizar Customer
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;
    const updateCustomer = new UpdateCustomerService();
    const customer = await updateCustomer.execute({
      id,
      name,
      email,
    });

    return response.json(customer);
  }

  //Deletar Customer
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteCustomer = new DeleteCustomerService();
    await deleteCustomer.execute({ id });
    return response.json({ message: 'Customer deleted successfully' });
  }
}
