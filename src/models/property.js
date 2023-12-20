import { Schema, model } from "mongoose";

const propertySchema = new Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
    },
    address: {
      street: {
        type: String,
      },
      suburb: {
        type: String,
      },
      city: {
        type: String,
      },
      province: {
        type: String,
      },
      postal: {
        type: Number,
      },
      location: {
        latitude: {
          type: Number,
        },
        longitude: {
          type: Number,
        },
      },
    },
    amenities: {
      type: [String],
    },
    price: {
      single: {
        type: Number,
      },
      sharing: {
        type: Number,
      },
    },
    images: {
      card: {
        type: String,
      },
      floors: {
        type: Array,
      },
      other: {
        type: Array,
      },
    },
  },
  { timestamps: true }
);

const Property = model("Property", propertySchema);

export { Property };
