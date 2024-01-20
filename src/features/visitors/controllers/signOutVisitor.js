// controllers/signOutVisitor.js

import { Visitor } from "../../../models/visitor.js";

async function signOutVisitor(req, res, next) {
  const { id } = req.params;

  try {
    const visitor = await Visitor.findById(id);
    console.log("ID", id);

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    // Unlink the property and tenant from the visitor
    visitor.property = null;
    visitor.tenant = null;

    await visitor.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: "Visitor signed out successfully",
      data: visitor,
    });
  } catch (error) {
    console.error("Error signing out visitor:", error);
    res.status(500).json({
      success: false,
      message: "Failed to sign out visitor",
      error: error.message,
    });
  }
}

export { signOutVisitor };
