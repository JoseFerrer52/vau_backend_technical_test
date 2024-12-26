import { Pool } from "pg";
import {
  DataInputSignIn,
  SignInResponse,
  SignInForRegisterBusiness,
} from "../domain/model/sign-in";
import { query, execute } from "../../../../data/postgresql";
import { addTokenToUser } from "../domain/add-token-to-user";
import { checkPassword } from "../../../../auth/token/check-password";
import { validationErrorResponse } from "../../../../utilities/errors/error-validation";

export const authUser =
  (pool: Pool) =>
  async (
    data: DataInputSignIn
  ): Promise<SignInResponse | SignInForRegisterBusiness | void> => {
    const queryData = query(pool);
    const executeQuery = execute(pool);
    const callProcQuery = `
    CALL sp_sign_in_user($1, $2, $3, $4);
  `;

    const result = await queryData(callProcQuery, [
      data.email,
      null,
      null,
      null,
    ]);

    const stateCode = result[0].o_state_code;
    const message = result[0].o_response;
    const userId: number = result[0].o_user_id;

    if (stateCode === 1) {
      validationErrorResponse(message);
    }
    if (stateCode === 0) {
      const [result] = await executeQuery(
        `
          SELECT
            u.user_id AS "userId",
            u.user_name AS "userName",
            u.user_email AS "userEmail",
            u.confirm_email AS "confirmEmail",
            u.user_password AS "userPassword"
          FROM users u
          WHERE u.user_id = $1
        `,
        [userId]
      );

      const password = result.userPassword;
      const id = result.userId;

      const passwordAndToken = await checkPassword(data, password, id);
      const token = passwordAndToken;
      const arrayMap = [result];
      const mergedResult = await addTokenToUser(arrayMap, token);
      const dataUser: SignInResponse = { dataUser: mergedResult };

      return dataUser;
    }
  };
