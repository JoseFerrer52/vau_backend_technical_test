import { execute } from "../../../data/postgresql";
import { Pool } from "pg";
import { DataInputForUser } from "../domain/model/user";
import { notFoundErrorResponse } from "../../../utilities/errors/error-not-found";
import { forbiddenErrorResponse } from "../../../utilities/errors/error-forbidden";

export const UpadteUser =
  async (pool: Pool) =>
  async (
    data: Partial<DataInputForUser>,
    password: string
  ): Promise<string | void> => {
    const queryData = execute(pool);
    const callProcQuery = `
    CALL sp_update_user($1, $2, $3, $4, $5, $6);
  `;

    const result = await queryData(callProcQuery, [
      data.userId,
      data.userName,
      password,
      data.email,
      null,
      null,
    ]);

    const stateCode = result[0].o_state_code;
    const message = result[0].o_response;
    if (stateCode === 3) {
      forbiddenErrorResponse(message);
    } else if (stateCode === 2) {
      notFoundErrorResponse(message);
    } else {
      return message;
    }
  };
