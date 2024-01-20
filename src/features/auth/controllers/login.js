import jwt from "jsonwebtoken";
import { User } from "../../../models/user.js";

async function login(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user && user.validatePassword(password)) {
      const token = jwt.sign({ userId: user._id }, "lsg0rb@ny!", {
        expiresIn: "1h",
      });

      res.json({ token });
    } else {
      res.status(401).json({ error: "Invalid username or password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export { login };
