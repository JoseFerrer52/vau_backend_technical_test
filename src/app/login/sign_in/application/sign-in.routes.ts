import { Router } from "express";
import { cachedAsync } from "../../../../utilities/cached-async";
import {
  singInValidate,
  createSingInValidation,
} from "../../../../middleware/validations/sign-in-validation";
import { signIn } from "./sign-in.controller";

const router = Router();

router.post(
  "/singIn",
  singInValidate(createSingInValidation),
  cachedAsync(signIn)
);

export default router;
