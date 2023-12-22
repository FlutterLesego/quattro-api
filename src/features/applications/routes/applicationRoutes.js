import { Router } from "express";
import { getApplications } from "../controllers/getApplications.js";

const router = Router();

router.route("/").get(getApplications);

export { router as applicationsRouter };
