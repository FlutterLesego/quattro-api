import { Schema, model } from "mongoose";

const visitorSchema = new Schema(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "property",
    },
    name: {
      type: String,
    },
    mobile: {
      type: String,
    },
    idCard: {
      type: String,
    },
  },
  { timestamps: true }
);

const Visitor = model("Visitor", visitorSchema);

export { Visitor };
