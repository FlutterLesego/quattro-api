import { Property } from "../../../models/property.js";

async function updateProperty(req, res, next) {
  const { id } = req.params;
  console.log(req.file);

  console.log(req.files);
  const fileName = req.file.filename;

  const fileNames = req.files.map((file) => file.filename);

  const property = await Property.findById(id);
  // property.images.card = `https://api.quattro.properties/images/properties/${fileName}`;
  res.status(200).json({});
}

export { updateProperty };
