import { User } from "../../../models/user.js";

async function updateUser(req, res, next) {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (req.file || (Array.isArray(req.files) && req.files.length > 0)) {
      await deleteOldImage(user);
    }

    const avatarImage = req.file?.avatar?.[0]?.filename || "";
    console.log(avatarImage);

    if (avatarImage) {
      user.avatar = constructImageUrl(avatarImage);
    }

    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.mobile = req.body.mobile || user.mobile;
    user.address = req.body.address || user.address;
    user.role =
      req.body.role !== undefined && req.body.role !== ""
        ? req.body.role
        : user.role;

    await user.save();
    console.log("After save: ", user.avatar);

    res
      .status(200)
      .json({ success: true, message: "User updated successfully!" });
  } catch (error) {
    console.log("Error updating user: ", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

async function deleteOldImage(user) {
  const oldUserAvatar = user.avatar;

  if (oldUserAvatar) {
    await deleteImageFromMongoDB(oldUserAvatar);
  }
}

async function deleteImageFromMongoDB(imageUrl) {
  try {
    const user = await User.findOne({
      $or: { avatar: imageUrl },
    });

    if (!user) {
      console.log(`User not found for image: ${imageUrl}`);
      return;
    }

    if (user.avatar === imageUrl) {
      user.avatar = "";
    }

    await user.save();

    console.log(`Deleted image from MongoDB: ${imageUrl}`);
  } catch (error) {
    console.error(`Error deleting image from MongoDB: ${imageUrl}`, error);
  }
}

function constructImageUrl(filename) {
  const baseUrl = "http://localhost:8000" || "https://api.quattro.properties";
  return `${baseUrl}/images/users/${filename}`;
}

export { updateUser };
