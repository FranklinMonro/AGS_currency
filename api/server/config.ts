import { Pool } from 'pg';
import { Sequelize } from 'sequelize';

import { configLogger as log } from './winstonLog';

const PORT = 3000;
const HOST = '0.0.0.0';

const PG_CONNECTION = {
  host: 'db', // host of db container'
  port: 5432, // 5432 is the default;
  database: 'postgres', // database name
  user: 'postgres', // database user name
  password: 'postgres', // database password
};

const SEQUILIZE_NEW = new Sequelize({
  host: PG_CONNECTION.host,
  dialect: 'postgres',
  port: PG_CONNECTION.port,
  database: PG_CONNECTION.database,
  username: PG_CONNECTION.user,
  password: PG_CONNECTION.password,
  benchmark: true,
  logging: false, // console.log, // false,
});

const POOL_PG = new Pool(PG_CONNECTION);

const connectToDB = async () => {
  try {
    await POOL_PG.connect();
    SEQUILIZE_NEW.authenticate();
    console.log('PostgresSQL connection made');
  } catch (err) {
    log.log('error', `Error in establish connection with DB error: ${err}`);
    console.log(err);
  }
};

connectToDB();


export {
  PORT,
  HOST,
  SEQUILIZE_NEW,
};
