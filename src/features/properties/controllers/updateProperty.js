// updateProperty.js
import { Property } from "../../../models/property.js";
import path from "path";
import * as fs from "node:fs/promises";

async function updateProperty(req, res, next) {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);

    if (req.file || (Array.isArray(req.files) && req.files.length > 0)) {
      await deleteOldImages(property);
    }

    const cardImage = req.files?.card?.[0]?.filename || "";

    const otherImages = req.files?.other?.map((file) => file.filename) || [];

    if (cardImage) {
      property.images.card = constructImageUrl(
        property.name.toLowerCase(),
        cardImage
      );
    }

    if (otherImages.length > 0) {
      property.images.other = otherImages.map((filename) =>
        constructImageUrl(property.name.toLowerCase(), filename)
      );
    }

    property.name = req.body.name || property.name;
    property.description = req.body.description || property.description;
    property.amenities = req.body?.amenities || property.amenities;
    property.price.single = req.body?.single || property.price.single;
    property.price.sharing = req.body?.sharing || property.price.sharing;
    property.type = req.body.type || property.type;

    const address = property.address;
    address.street = req.body?.street || property.address.street;
    address.suburb = req.body?.suburb || property.address.suburb;
    address.city = req.body?.city || property.address.city;
    address.province = req.body?.province || property.address.province;
    address.postal = req.body?.postal || property.address.postal;
    address.location.latitude =
      req.body?.latitude || property.address.location.latitude;
    address.location.longitude =
      req.body?.longitude || property.address.location.longitude;

    console.log(req.body.type);
    await property.save();

    res
      .status(200)
      .json({ success: true, message: "Property updated successfully" });
  } catch (error) {
    console.error("Error updating property:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function deleteOldImages(property) {
  const oldCardImage = property.images.card;
  const oldOtherImages = property.images.other || [];
  if (oldCardImage) {
    await deleteImageFromMongoDB(oldCardImage);
  }

  for (const oldOtherImage of oldOtherImages) {
    await deleteImageFromMongoDB(oldOtherImage);
  }
}

async function deleteImageFromMongoDB(imageUrl) {
  try {
    const property = await Property.findOne({
      $or: [{ "images.card": imageUrl }, { "images.other": imageUrl }],
    });

    if (!property) {
      console.log(`Property not found for image: ${imageUrl}`);
      return;
    }

    if (property.images.card === imageUrl) {
      property.images.card = "";
    }

    if (property.images.other && property.images.other.includes(imageUrl)) {
      property.images.other = property.images.other.filter(
        (url) => url !== imageUrl
      );
    }

    await property.save();

    console.log(`Deleted image from MongoDB: ${imageUrl}`);
  } catch (error) {
    console.error(`Error deleting image from MongoDB: ${imageUrl}`, error);
  }
}

function constructImageUrl(propertyName, filename) {
  const environment = process.env.NODE_ENV;

  const baseUrl =
    environment === "development"
      ? "https://data.quattro.properties"
      : "http://localhost:8000";
  return `${baseUrl}/images/properties/${propertyName}/${filename}`;
}

export { updateProperty };
