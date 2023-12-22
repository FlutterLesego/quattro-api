import { Schema, model } from "mongoose";

const faultSchema = new Schema(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
    technician: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    bed: {
      type: String,
    },
    category: {
      type: String,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    repaired: {
      type: Boolean,
      default: false,
    },
    images: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Fault = model("Fault", faultSchema);

export { Fault };
