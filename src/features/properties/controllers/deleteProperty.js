import { Property } from "../../../models/property.js";

async function deleteProperty(req, res, next) {
  const { id } = req.params;
  const properties = await Property.findByIdAndDelete(id);
}

export { deleteProperty };
