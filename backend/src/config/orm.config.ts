import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables from a .env file
dotenv.config();

const config: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, '..', '**/*.entity{.ts,.js}')], // Path to your entity files
  migrations: [join(__dirname, '..', 'database/migrations/**/*{.ts,.js}')], // Path to your migration files
  synchronize: false, // Set to false in production to prevent data loss
  logging: true,
};

export default config;
export const AppDataSource = new DataSource(config);