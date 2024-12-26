import { execute, query } from "../../../data/postgresql";
import { UserInput, AllUser } from "../domain/model/all-users";
import { Pool } from "pg";
import { cleanDataUser } from "../domain/clean-data-user";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const selectAllUser =
  async (pool: Pool) =>
  async (data: UserInput): Promise<AllUser | void> => {
    const executeQuery = execute(pool);
    const queryData = query(pool);

    const result = await queryData(
      `
      SELECT user_id FROM users WHERE user_id = $1;
    `,
      [data.userId]
    );

    const userId = result;

    console.log("this", result);

    if (userId === undefined) {
      forbiddenErrorResponse("No tienes permiso para realizar esta acción");
    } else {
      const rows = await executeQuery(
        ` 
      SELECT * FROM users`
      );

      const listUser = await cleanDataUser(rows);
      console.log("this", listUser);

      const users: AllUser = { users: listUser };

      return users;
    }
  };
