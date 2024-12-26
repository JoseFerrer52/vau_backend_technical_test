import { Response, Request } from "express";
import { createPool } from "../../../../data/postgresql";
import { response } from "../../../../utilities/response";
import { DataInputSignIn } from "../domain/model/sign-in";
import { authUser } from "../infrastructure/sign-in.postgresql";

const pool = createPool();

export const signIn = async (req: Request, res: Response) => {
  const data: DataInputSignIn = req.body;

  const authUserFunc = await authUser(pool);
  const dataUser = await authUserFunc(data);

  response(res, 200, "ok", dataUser);
};
