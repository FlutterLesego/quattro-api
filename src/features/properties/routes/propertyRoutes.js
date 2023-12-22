import path from "path";
import { Router } from "express";
import multer from "multer";
import { getProperties } from "../controllers/getProperties.js";
import { updateProperty } from "../controllers/updateProperty.js";
import { deleteProperty } from "../controllers/deleteProperty.js";
import { getProperty } from "../controllers/getProperty.js";

const __dirname = path.resolve();

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/public/images/properties`);
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

router.route("/update/:id").patch(upload.single("card"), updateProperty);

export { router as propertiesRouter };
