import { Pool } from "pg";
import { CONFIG } from "../config/config";
import dotenv from "dotenv";

dotenv.config();

export const createPool = () => {
  return new Pool({
    host: CONFIG.app.database.host,
    user: CONFIG.app.database.user,
    password: CONFIG.app.database.password,
    port: CONFIG.app.database.port,
    database: CONFIG.app.database.database,
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

export const query = (pool: Pool) => async (sql: string, params?: any[]) => {
  try {
    const res = await pool.query(sql, params);
    return res.rows;
  } catch (err) {
    throw new Error(`Error en la consulta: ${err.message}`);
  }
};

export const execute =
  (pool: Pool) =>
  async (sql: string, params?: any[]): Promise<any[]> => {
    try {
      const res = await pool.query(sql, params);
      return res.rows;
    } catch (err) {
      throw new Error(`Error en la consulta: ${err.message}`);
    }
  };
