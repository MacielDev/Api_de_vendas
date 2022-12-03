import 'reflect-metadata';
import 'dotenv/config';
import { app } from './app';
import { dataSource } from './../typeorm/index';

dataSource.initialize().then(() => {
  app.listen(process.env.APP_PORT || 3333, () => {
    console.log('server is running on port 3333');
  });
});
