import { Router } from "express";
import { getProperties } from "../controllers/getProperties.js";
import { updateProperty } from "../controllers/updateProperty.js";
import { deleteProperty } from "../controllers/deleteProperty.js";
import { getProperty } from "../controllers/getProperty.js";

const router = Router();

router.route("/").get(getProperties);
router
  .route("/:id")
  .patch(updateProperty)
  .delete(deleteProperty)
  .get(getProperty);

export { router as propertiesRouter };
