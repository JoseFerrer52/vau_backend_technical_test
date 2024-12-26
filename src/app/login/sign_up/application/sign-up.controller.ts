import { Response, Request } from "express";
import { createPool } from "../../../../data/postgresql";
import bcrypt from "bcrypt";
import { response } from "../../../../utilities/response";
import { DataInputForSignUp } from "../domain/model/sign-up";
import { registerUser } from "../infrastructure/sign-up.postgresql";

const pool = createPool();

export const signUp = async (req: Request, res: Response) => {
  console.log(req.body);

  const data: DataInputForSignUp = req.body;

  const encryp = await bcrypt.hash(data.password, 5);

  const resgiterUserFunc = await registerUser(pool);
  const signUp = await resgiterUserFunc(data, encryp);

  response(res, 200, signUp, {});
};
