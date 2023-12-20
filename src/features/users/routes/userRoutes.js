import { Router } from "express";
import { getUsers } from "../controllers/getUsers.js";

const router = Router();

router.route("/").get(getUsers);

export { router as usersRouter };
