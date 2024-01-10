// controllers/addUser.js

import path from "path";
import * as fs from "node:fs";
import multer from "multer";
import bcrypt from "bcrypt"; // Import bcrypt
import { User } from "../../../models/user.js";

const __dirname = path.resolve();

async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

const multerStorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const folderPath = `${__dirname}/public/images/users/`;
      await fs.promises.mkdir(folderPath, { recursive: true });
      cb(null, folderPath);
    } catch (error) {
      console.log("Error creating folder:", error);
      cb(error);
    }
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".")[1].toLowerCase();
    const filename = file.originalname.split(".")[0].toLowerCase();
    cb(null, `${filename}.${ext}`);
  },
});

const upload = multer({
  storage: multerStorage,
  limits: { fieldSize: 10 * 1024 * 1024 },
});

async function addUser(req, res) {
  try {
    const { username, email, mobile, address, role } = JSON.parse(
      req.body.data
    );

    if (!username || !email || !mobile || !address || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const generatedPassword = generateRandomPassword();

    const hashedPassword = await hashPassword(generatedPassword);

    const newUser = new User({
      username,
      email,
      mobile,
      address,
      role,
      department,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: newUser,
      generatedPassword,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

function generateRandomPassword() {
  const length = Math.floor(Math.random() * (12 - 8 + 1)) + 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@!#$?*/";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
}

export { addUser };
