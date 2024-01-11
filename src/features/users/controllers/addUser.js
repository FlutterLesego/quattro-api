import { User } from "../../../models/user.js";
import path from "path";
import * as fs from "node:fs/promises";

async function addUser(req, res, next) {
  const __dirname = path.resolve();

  try {
    const { username, mobile, address, email, role, department } = req.body;

    const newUser = new User({
      username,
      mobile,
      address,
      email,
      role,
      department,
      avatar: "",
    });

    console.log(newUser);

    await newUser.save();

    if (req.files) {
      const avatar = req.files.avatar ? req.files.card.filename : "";
      if (avatar) {
        newUser.avatar = constructImageUrl(avatar);

        await newUser.save();
      }
    }

    res.status(201).json({ success: true, message: "User added successfully" });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

function constructImageUrl(filename) {
  const environment = process.env.NODE_ENV;

  const baseUrl =
    environment === "development"
      ? "https://data.quattro.properties"
      : "http://localhost:8000";
  return `${baseUrl}/images/users/${filename}`;
}

export { addUser };
