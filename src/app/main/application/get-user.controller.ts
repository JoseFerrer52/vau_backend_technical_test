import { response } from "../../../utilities/response";
import { Response, Request } from "express";
import { UserInput } from "../domain/model/all-users";
import { createPool } from "../../../data/postgresql";
import { selectAllUser } from "../infrastructure/select-all-user.postgresql";

const pool = createPool();

export const getAllUser = async (req: Request, res: Response) => {
  const data: UserInput = req.body;
  console.log(data);

  const selectAllUserFunc = await selectAllUser(pool);

  const allUser = await selectAllUserFunc(data);

  response(res, 200, "ok", allUser);
};
