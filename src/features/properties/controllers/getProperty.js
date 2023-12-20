import { Property } from "../../../models/property.js";

async function getProperty(req, res, next) {
  const { id } = req.params;
  const property = await Property.findById(id);

  res.status(200).json({
    success: true,
    message: "Property retrieved successfully",
    data: property,
  });
}

export { getProperty };
