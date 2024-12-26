import dotenv from "dotenv";

dotenv.config();

export const CONFIG = {
  app: {
    database: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
    },
    secret: {
      jwt: process.env.JWT_SECRET,
    },
    hostPort: {
      port: process.env.HOST_PORT,
    },
  },
};
