import { registerAs } from '@nestjs/config';

export default registerAs('dbConfig', () => {
  const dbConfig = {
    db: {
      connection: process.env.DB_CONNECTION,
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      srv : process.env.DB_SRV,
      cluster : process.env.DB_CLUSTER,
    },
    env: process.env.NODE_ENV || 'local',
  };
  return dbConfig;
});