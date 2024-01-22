import { Visitor } from "../../../models/visitor.js";

async function getVisitor(req, res, next) {
  const { id } = req.params;
  const visitor = await Visitor.findById(id);

  res.status(200).json({
    success: true,
    message: "Visitor retrieved successfully!",
    data,
    visitor,
  });
}

export { getVisitor };
