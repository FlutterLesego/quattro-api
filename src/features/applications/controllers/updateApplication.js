import { Application } from "../../../models/application.js";

async function updateApplication(req, res, next) {
  const { id } = req.params;

  try {
    const application = await Application.findById(id);

    application.documentsReceived =
      req.body.documentsReceived || application.documentsReceived;
    application.adminFeePaid =
      req.body.adminFeePaid || application.adminFeePaid;

    await application.save();

    res
      .status(200)
      .json({ success: true, message: "Application updated successfully!" });
  } catch (error) {
    console.log("Error updating application: ", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export { updateApplication };
