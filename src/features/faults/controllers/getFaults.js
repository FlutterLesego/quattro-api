import { Fault } from "../../../models/fault.js";

async function getFaults(req, res, next) {
  const faults = await Fault.find().populate("tenant").populate("property");

  res.status(200).json({
    success: true,
    message: "Faults retrieved successfully!",
    data: faults,
  });
}
export { getFaults };
