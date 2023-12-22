import { Router } from "express";
import { getFaults } from "../controllers/getFaults.js";
import { getFault } from "../controllers/getFault.js";

const router = Router();

router.route("/").get(getFaults);
router.route("/:id").get(getFault);

export { router as faultsRouter };
