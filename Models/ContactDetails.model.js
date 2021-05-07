import { Schema, model } from "mongoose";
const contactdetails = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    contacts: [
      {
        name: { type: String, required: true },
        mailId: { type: String, required: true },
        mobileNumber: { type: Number, required: true },
        createdOn: { type: Date, default: Date.now },
      },
    ],
  },
  {
    collection: "contactdetails",
  }
);

export default model("contactdetails", contactdetails);
