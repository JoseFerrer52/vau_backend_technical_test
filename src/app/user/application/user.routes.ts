import { Router } from "express";
import { cachedAsync } from "../../../utilities/cached-async";
import { checkToken } from "../../../middleware/check_token/check-token";
import {
  validateUpadteUser,
  createFormUpadteUserValidation,
} from "../../../middleware/validations/upadte-user-validation";
import {
  validateDeleteUser,
  createFormdeleteUserValidation,
} from "../../../middleware/validations/delete-user-validation";
import { putUser, DropUser } from "./user.controller";

const router = Router();

router.put(
  "/update-user",
  checkToken(),
  validateUpadteUser(createFormUpadteUserValidation),
  cachedAsync(putUser)
);

router.post(
  "/delete-user",
  checkToken(),
  validateDeleteUser(createFormdeleteUserValidation),
  cachedAsync(DropUser)
);

export default router;
