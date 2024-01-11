import { Property } from "../../../models/property.js";
import path from "path";
import * as fs from "node:fs/promises";

async function addProperty(req, res, next) {
  const __dirname = path.resolve();

  try {
    const {
      name,
      description,
      amenities,
      single,
      sharing,
      type,
      street,
      suburb,
      city,
      province,
      postal,
      latitude,
      longitude,
    } = req.body;

    const newProperty = new Property({
      name,
      description,
      amenities,
      price: {
        single,
        sharing,
      },
      type,
      address: {
        street,
        suburb,
        city,
        province,
        postal,
        location: {
          latitude,
          longitude,
        },
      },
      images: {
        card: "",
        floors: [],
        other: [],
      },
    });

    console.log(newProperty);

    await newProperty.save();

    const folderPath = `${__dirname}/public/images/properties`;

    if (req.files) {
      const cardImage = req.files.card ? req.files.card[0].filename : "";
      const floorsImages = req.files.floors
        ? req.files.floors.map((file) => file.filename)
        : [];
      const otherImages = req.files.other
        ? req.files.other.map((file) => file.filename)
        : [];

      if (cardImage) {
        newProperty.images.card = constructImageUrl(cardImage);
      }

      if (floorsImages.length > 0) {
        newProperty.images.floors = floorsImages.map((filename) =>
          constructImageUrl(filename)
        );
      }

      if (otherImages.length > 0) {
        newProperty.images.other = otherImages.map((filename) =>
          constructImageUrl(filename)
        );
      }

      await newProperty.save();
    }

    res
      .status(201)
      .json({ success: true, message: "Property added successfully" });
  } catch (error) {
    console.error("Error adding property:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

function constructImageUrl(filename) {
  const environment = process.env.NODE_ENV;

  const baseUrl =
    environment === "development"
      ? "https://data.quattro.properties"
      : "http://localhost:8000";
  return `${baseUrl}/images/properties/${filename}`;
}

export { addProperty };
