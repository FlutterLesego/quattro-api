import { Router } from "express";
import { getVisitors } from "../controllers/getVisitors.js";
import { signOutVisitor } from "../controllers/signOutVisitor.js";
import { getVisitor } from "../controllers/getVisitor.js";

const router = Router();

router.route("/").get(getVisitors);
router.route("/:id").get(getVisitor);
router.route("/sign-out/:id").put(signOutVisitor);

export { router as visitorsRouter };
