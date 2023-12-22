import { Visitor } from "../../../models/visitor.js";

async function getVisitors(req, res, next) {
  const visitors = await Visitor.find();

  res.status(200).json({
    success: true,
    message: "Visitors retrieved successfully!",
    data: visitors,
  });
}

export { getVisitors };
