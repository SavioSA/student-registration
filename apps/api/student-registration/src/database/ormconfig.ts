import { join } from 'path';
import { DataSource } from 'typeorm';

const dataSource = new DataSource({
  type: 'postgres',
  port: parseInt(process.env.MYSQL_PORT as string, 10),
  host: process.env.POSTGRES_HOSTNAME,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  logging: true,
  synchronize: false,
  name: 'default',
  entities: [join(__dirname, '/entities/**')],
  migrations: [join(__dirname, '/entities/**')],
  subscribers: ['dist/src/database/subscriber/**'],
});

export default dataSource;
