import { Router } from "express";
import { login } from "../controllers/login.js";

const router = Router();

router.post("/login", login);

export { router as authRouter };
