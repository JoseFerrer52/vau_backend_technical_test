import { Router } from "express";
import { checkToken } from "../../../middleware/check_token/check-token";
import {
  getAllTransactionValidation,
  getAllTransactionValidate,
} from "../../../middleware/validations/get-all-transaction-validation";
import { getAllUser } from "./get-user.controller";
import { cachedAsync } from "../../../utilities/cached-async";

const router = Router();

router.post(
  "/get-all-users",
  checkToken(),
  getAllTransactionValidate(getAllTransactionValidation),
  cachedAsync(getAllUser)
);

export default router;
