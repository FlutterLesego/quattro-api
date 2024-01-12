// deleteUser.js
import { User } from "../../../models/user.js";
import path from "path";
import * as fs from "node:fs/promises";

const __dirname = path.resolve();

async function deleteUser(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    await deleteAvatar(user);

    await User.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "User removed successfully" });
  } catch (error) {
    console.error("Error removing user:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function deleteAvatar(user) {
  const oldUserAvatar = user.avatar;

  if (oldUserAvatar) {
    const filename = extractFilenameFromUrl(oldUserAvatar);

    await deleteImageFromMongoDB(oldUserAvatar);
    await deleteImageFromFileSystem(filename);
  }
}

function extractFilenameFromUrl(imageUrl) {
  const parts = imageUrl.split("/");
  return parts[parts.length - 1];
}

async function deleteImageFromMongoDB(imageUrl) {
  try {
    const user = await User.findOne({ avatar: imageUrl });

    if (!user) {
      console.log(`User not found for avatar: ${imageUrl}`);
      return;
    }

    if (user.avatar === imageUrl) {
      user.avatar = "";
    }

    await user.save();

    console.log(`Removed avatar from MongoDB: ${imageUrl}`);
  } catch (error) {
    console.error(`Error removing avatar from MongoDB: ${imageUrl}`, error);
  }
}

async function deleteImageFromFileSystem(imageUrl) {
  const folderPath = `${__dirname}/public/images/users`;

  const avatarImagePath = `${folderPath}/${imageUrl}`;
  await fs.unlink(avatarImagePath);
  console.log(`Removed avatar image from file system: ${avatarImagePath}`);
}

export { deleteUser };
