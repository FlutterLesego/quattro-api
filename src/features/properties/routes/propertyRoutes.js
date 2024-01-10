// properties.js
import path from "path";
import * as fs from "node:fs";
import { Router } from "express";
import multer from "multer";
import { getProperties } from "../controllers/getProperties.js";
import { updateProperty } from "../controllers/updateProperty.js";
import { deleteProperty } from "../controllers/deleteProperty.js";
import { getProperty } from "../controllers/getProperty.js";
import { Property } from "../../../models/property.js";

const __dirname = path.resolve();

const multerStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const { id } = req.params;

    try {
      const property = await Property.findById(id);

      const propertyName = property.name.toLowerCase();
      const folderPath = `${__dirname}/public/images/properties/${propertyName}`;

      await fs.promises.mkdir(folderPath, { recursive: true });

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

export { router as propertiesRouter };
