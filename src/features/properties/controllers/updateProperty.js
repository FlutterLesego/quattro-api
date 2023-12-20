import { Property } from "../../../models/property.js";

async function updateProperty(req, res, next) {
  const { id } = req.params;

  const property = await Property.findById(id);
}

export { updateProperty };
