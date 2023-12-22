import { Fault } from "../../../models/fault.js";

async function getFault(req, res, next) {
  const { id } = req.params;
  const fault = await Fault.findById(id);

  req.status(200).json({
    success: true,
    message: "Fault retrieved successfully!",
    data: fault,
  });
}

export { getFault };
