import { CreateProducts1669556413739 } from './migrations/1669556413739-CreateProducts';
import Product from '@modules/products/typeorm/entities/Product';
import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

dotenv.config();

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});

// migrations: //`${__dirname}/**/migrations/*.{ts}`
//entities: `${__dirname}/**/entities/*.{ts,js}`
