import { User } from "../../../models/user.js";

async function getUsers(req, res, next) {
  const users = await User.find();

  res.status(200).json({
    success: true,
    message: "Users retrieved successfully!",
    data: users,
  });
}

export { getUsers };
