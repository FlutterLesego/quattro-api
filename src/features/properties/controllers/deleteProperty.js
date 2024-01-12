// deleteProperty.js
import { Property } from "../../../models/property.js";
import path from "path";
import * as fs from "node:fs/promises";

const __dirname = path.resolve();

async function deleteProperty(req, res, next) {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    await deleteImages(property);

    await Property.findByIdAndDelete(id);

    res
      .status(200)
      .json({ success: true, message: "Property removed successfully" });
  } catch (error) {
    console.error("Error removing property:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function deleteImages(property) {
  const cardImage = property.images.card;
  const otherImages = property.images.other || [];
  const floorImages = property.images.floors || [];

  await deleteImageFromMongoDB(cardImage);

  for (const otherImage of otherImages) {
    await deleteImageFromMongoDB(otherImage);
  }

  for (const floorImage of floorImages) {
    await deleteImageFromMongoDB(floorImage);
  }

  await deleteImagesFromFileSystem(cardImage, otherImages, floorImages);
}

async function deleteImageFromMongoDB(imageUrl) {
  try {
    const property = await Property.findOne({
      $or: [
        { "images.card": imageUrl },
        { "images.other": imageUrl },
        { "images.floors": imageUrl },
      ],
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

    if (property.images.floors && property.images.floors.includes(imageUrl)) {
      property.images.floors = property.images.floors.filter(
        (url) => url !== imageUrl
      );
    }

    await property.save();

    console.log(`Removed image from MongoDB: ${imageUrl}`);
  } catch (error) {
    console.error(`Error removing image from MongoDB: ${imageUrl}`, error);
  }
}

async function deleteImagesFromFileSystem(cardImage, otherImages, floorImages) {
  const folderPath = `${__dirname}/public/images/properties`;

  if (cardImage) {
    const cardImagePath = `${folderPath}/${cardImage}`;
    await fs.unlink(cardImagePath);
    console.log(`Removed card image from file system: ${cardImagePath}`);
  }

  for (const otherImage of otherImages) {
    const otherImagePath = `${folderPath}/${otherImage}`;
    await fs.unlink(otherImagePath);
    console.log(`Removed other image from file system: ${otherImagePath}`);
  }

  for (const floorImage of floorImages) {
    const floorImagePath = `${folderPath}/${floorImage}`;
    await fs.unlink(floorImagePath);
    console.log(`Removed other image from file system: ${floorImagePath}`);
  }
}

export { deleteProperty };
