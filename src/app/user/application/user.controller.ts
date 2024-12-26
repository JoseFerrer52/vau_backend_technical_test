import { Response, Request } from "express";
import bcrypt from "bcrypt";
import { createPool } from "../../../data/postgresql";
import { response } from "../../../utilities/response";
import { DataInputForUser, DataInputForDeleteUser } from "../domain/model/user";
import { UpadteUser } from "../infrastructure/user.postgresql";
import { deleteUser } from "../infrastructure/delete-user.postgresql";

const pool = createPool();

export const putUser = async (req: Request, res: Response) => {
  const data: Partial<DataInputForUser> = req.body;

  if (!data.password) {
    const UpadteUserFunc = await UpadteUser(pool);
    const user = await UpadteUserFunc(data, null);
    response(res, 200, user, {});
  } else {
    const encryp = await bcrypt.hash(data.password, 5);
    const UpadteUserFunc = await UpadteUser(pool);
    const user = await UpadteUserFunc(data, encryp);
    response(res, 200, user, {});
  }
};

export const DropUser = async (req: Request, res: Response) => {
  const data: DataInputForDeleteUser = req.body;

  const deleteUserFunc = await deleteUser(pool);
  const result = await deleteUserFunc(data);
  response(res, 200, result, {});
};
