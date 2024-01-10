import { Application } from "../../../models/application.js";

async function getApplications(req, res, next) {
  const applications = await Application.find();

  res.status(200).json({
    success: true,
    messages: "Applications retrieved successfully!",
    data: applications,
  });
}

export { getApplications };
