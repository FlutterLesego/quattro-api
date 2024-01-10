import { Router } from "express";
import { getApplications } from "../controllers/getApplications.js";
import { updateApplication } from "../controllers/updateApplication.js";

const router = Router();

router.route("/").get(getApplications);
router.route("/update/:id").patch(updateApplication);

export { router as applicationsRouter };
