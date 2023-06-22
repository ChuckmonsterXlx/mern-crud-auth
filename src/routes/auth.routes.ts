import { Router } from "express";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller";
import { authRequired } from "../middlewares/validateToken";
import { validateSchema } from "../middlewares/validator.middleware";
import { registerSchema, loginSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/register", [validateSchema(registerSchema)], register);

router.post("/login", [validateSchema(loginSchema)], login);

router.post("/logout", logout);

router.get("/profile", [authRequired], profile);

export default router;
