import { query, execute } from "../../../data/postgresql";
import { Pool } from "pg";
import { DataInputForDeleteUser } from "../domain/model/user";
import { checkPassword } from "../domain/checkPassword";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";

export const deleteUser =
  async (pool: Pool) =>
  async (data: DataInputForDeleteUser): Promise<string | void> => {
    const queryData = query(pool);
    const executeQuery = execute(pool);

    const callProcQuery = `
    CALL sp_delete_user($1, $2, $3, $4);
  `;

    const result = await queryData(callProcQuery, [
      data.userId,
      null,
      null,
      null,
    ]);

    const stateCode = result[0].o_state_code;
    const message = result[0].o_response;
    const password = result[0].o_password;
    const response = "Usuario eliminado con exito";

    if (stateCode === 3) {
      forbiddenErrorResponse(message);
    } else if (stateCode === 2) {
      notFoundErrorResponse(message);
    } else {
      await checkPassword(data, password);
      await executeQuery(
        `
        DELETE FROM users WHERE user_id = $1;
      `,
        [data.userId]
      );

      return response;
    }
  };
