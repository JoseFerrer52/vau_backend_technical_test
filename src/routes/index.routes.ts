import { Router } from "express";
import user from "../app/user/application/user.routes";
import signUpRoutes from "../app/login/sign_up/application/sign-up.routes";
import signInRoutes from "../app/login/sign_in/application/sign-in.routes";
import selectUsers from "../app/main/application/get-user.routes";
const router = Router();

router.use("/login", signUpRoutes);
router.use("/login", signInRoutes);
router.use("/user", user);
router.use("/user", user);
router.use("/main", selectUsers);

export default router;
