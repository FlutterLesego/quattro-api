import { Schema, model } from "mongoose";

const studentSchema = new Schema({
  title: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  idNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
  studentNumber: {
    type: String,
  },
  university: {
    type: String,
  },
  bursary: {
    type: String,
  },
});

const guardianSchema = new Schema({
  title: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  idNumber: {
    type: String,
  },
  email: {
    type: String,
  },
  mobile: {
    type: String,
  },
  address: {
    type: String,
  },
  payment: {
    type: String,
  },
});

const applicationSchema = new Schema(
  {
    propertyName: {
      type: String,
    },
    roomType: {
      type: String,
    },
    type: {
      type: String,
    },
    prefix: {
      type: String,
    },
    bed: {
      type: String,
    },
    property: {
      type: Schema.Types.ObjectId,
      ref: "Property",
    },
    tenant: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Room",
    },
    gender: {
      type: String,
    },
    startDate: {
      type: String,
    },
    endDate: {
      type: String,
    },
    details: studentSchema,
    guardian: guardianSchema,
    studentId: {
      type: String,
    },
    guardianId: {
      type: String,
    },
    studentIdCard: {
      type: String,
    },
    pop: {
      type: String,
    },
    affidavit: {
      type: String,
    },
    applicationReceived: {
      type: Boolean,
      default: false,
    },
    documentsReceived: {
      type: Boolean,
      default: false,
    },
    adminFeePaid: {
      type: Boolean,
      default: false,
    },
    contractSigned: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Application = model("Application", applicationSchema);

export { Application };
