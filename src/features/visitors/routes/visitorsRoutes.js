import { Router } from "express";
import { getVisitors } from "../controllers/getVisitors.js";
import { signOutVisitor } from "../controllers/signOutVisitor.js";

const router = Router();

router.route("/").get(getVisitors);
router.route("/sign-out/:id").put(signOutVisitor);

export { router as visitorsRouter };
