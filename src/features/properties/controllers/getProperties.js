import { Property } from "../../../models/property.js";

async function getProperties(req, res, next) {
  const properties = await Property.find();

  res.status(200).json({
    success: true,
    message: "Properties retrieved successfully",
    data: properties,
  });
}

export { getProperties };
