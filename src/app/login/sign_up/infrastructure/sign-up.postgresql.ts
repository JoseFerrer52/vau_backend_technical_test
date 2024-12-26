import { Pool } from "pg";
import { DataInputForSignUp } from "../domain/model/sign-up";
import { query } from "../../../../data/postgresql";
import { conflictErrorResponse } from "../../../../utilities/errors/error-conflict";

export const registerUser =
  (pool: Pool) =>
  async (
    data: DataInputForSignUp,
    password: string
  ): Promise<string | void> => {
    const queryData = query(pool);
    const callProcQuery = `
    CALL sp_sign_up_user($1, $2, $3, $4, $5);
  `;

    const result = await queryData(callProcQuery, [
      data.userName,
      password,
      data.email,
      null,
      null,
    ]);

    const stateCode = result[0].o_state_code;
    const message = result[0].o_response;
    if (stateCode === 4) {
      conflictErrorResponse(message);
    }
    if (stateCode === 0) {
      return message;
    }
  };
