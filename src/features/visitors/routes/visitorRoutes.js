import { Router } from "express";
import { getVisitors } from "../controllers/getVisitors.js";

const router = Router();

router.route("/").get(getVisitors);

export { router as visitorsRouter };
