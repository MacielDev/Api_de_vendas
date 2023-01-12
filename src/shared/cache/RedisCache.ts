import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cash';

class RedisCache {
  private client: RedisClient;
  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  // Método para salvar um valor "set"
  public async save(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  // método para buscar um valor "set"
  public async recover<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);
    if (!data) {
      return null;
    }
    const pasrseData = JSON.parse(data) as T;
    return pasrseData;
  }

  //excluir um valor em cache
  public async invalidate(key: string): Promise<void> {
    await this.client.del(key);
  }
}
export default new RedisCache();
