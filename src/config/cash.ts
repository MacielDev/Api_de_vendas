//Definindo a tipagem do Objeto
import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  config: {
    redis: RedisOptions;
  };
  driver: string;
}

export default {
  //Objeto de configuracão do Redis
  config: {
    redis: {
      host: process.env.REDIS_HOST || undefined,
      port: process.env.REDIS_PORT || undefined,
      password: process.env.REDIS_PASS || undefined,
    },
  },
  //Driver
  driver: 'redis',
} as ICacheConfig;
