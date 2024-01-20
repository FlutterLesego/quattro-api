import path from "path";
import { Router } from "express";
import multer from "multer";
import { getProperties } from "../controllers/getProperties.js";
import { updateProperty } from "../controllers/updateProperty.js";
import { deleteProperty } from "../controllers/deleteProperty.js";
import { getProperty } from "../controllers/getProperty.js";
import { Property } from "../../../models/property.js";
import { addProperty } from "../controllers/addProperty.js";

const __dirname = path.resolve();

const multerStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { id } = req.params;

    try {
      const folderPath = `${__dirname}/public/images/properties`;

      cb(null, folderPath);
    } catch (error) {
      console.error("Error fetching property:", error);
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".")[1].toLowerCase();
    const filename = file.originalname.split(".")[0].toLowerCase();

    cb(null, `${filename}.${ext}`);
  },
});

const upload = multer({ storage: multerStorage });

const router = Router();

router.route("/").get(getProperties);
router.route("/:id").delete(deleteProperty).get(getProperty);
router.route("/update/:id").patch(
  upload.fields([
    { name: "card", maxCount: 1 },
    { name: "other", maxCount: 5 },
  ]),
  updateProperty
);
router.route("/add").post(
  upload.fields([
    { name: "card", maxCount: 1 },
    { name: "other", maxCount: 5 },
    { name: "floors", maxCount: 10 },
  ]),
  addProperty
);
router.route("/delete/:id").delete(deleteProperty);

export { router as propertiesRouter };
