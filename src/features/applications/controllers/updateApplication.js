import { Application } from "../../../models/application.js";

async function updateApplication(req, res, next) {
  const { id } = req.params;

  try {
    const application = await Application.findById(id);

    if (!req.body.adminFeePaid) {
      // application.property = null;
      application.bed = null;
      // application.room = null;
    }

    application.adminFeePaid =
      req.body.adminFeePaid !== undefined
        ? req.body.adminFeePaid === "Yes"
        : application.adminFeePaid;

    application.documentsReceived =
      req.body.documentsReceived !== undefined
        ? req.body.documentsReceived
        : application.documentsReceived;

    console.log("Received request payload:", req.body);
    console.log("Received adminFeePaid from request:", req.body.adminFeePaid);

    await application.save();

    console.log(
      "Updated adminFeePaid in the database:",
      application.adminFeePaid
    );

    res
      .status(200)
      .json({ success: true, message: "Application updated successfully!" });
  } catch (error) {
    console.log("Error updating application: ", error);
    res.status(500).json({ success: false, message: "Internal server error!" });
  }
}

export { updateApplication };
