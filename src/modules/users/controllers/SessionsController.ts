import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const createSession = new CreateSessionsService();

    // Atualmente receberá de retorno somente um User , porém adiante teremos que receber o token de autenticação
    const user = await createSession.execute({
      email,
      password,
    });
    return response.json(user);
  }
}
