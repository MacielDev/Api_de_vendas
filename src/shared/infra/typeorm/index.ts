import dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import { CreateProduct1669764871054 } from './migrations/1669764871054-CreateProduct';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: ['./src/modules/products/typeorm/entities/*.ts'],
  migrations: [CreateProduct1669764871054],
});

// migrations: //`${__dirname}/**/migrations/*.{ts,js}`
//entities: `${__dirname}/**/entities/*.{ts,js}`
