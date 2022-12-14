import { join } from 'path';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const dataSource = new DataSource({
  type: 'postgres',
  port: parseInt(process.env.MYSQL_PORT as string, 10),
  host: process.env.POSTGRES_HOSTNAME,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  logging: ['query', 'error'],
  synchronize: false,
  name: 'default',
  entities: [join(__dirname, '/entities/**')],
  migrations: [join(__dirname, '/migrations/**')],
  subscribers: ['dist/src/database/subscriber/**'],
  namingStrategy: new SnakeNamingStrategy(),
});

export default dataSource;
