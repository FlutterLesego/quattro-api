import { Router } from "express";
import path from "path";
import * as fs from "node:fs";
import multer from "multer";
import { getUsers } from "../controllers/getUsers.js";
import { User } from "../../../models/user.js";
import { updateUser } from "../controllers/updateUser.js";
import { addUser } from "../controllers/addUser.js";

const __dirname = path.resolve();

const multerStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const folderPath = `${__dirname}/public/images/users`;

      await fs.promises.mkdir(folderPath, { recursive: true });

      cb(null, folderPath);
    } catch (error) {
      console.log("Error fetching user: ", error);
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

router.route("/").get(getUsers);
router.route("/").post(addUser);
router.route("/update/:id").patch(upload.single("avatar"), updateUser);

export { router as usersRouter };
