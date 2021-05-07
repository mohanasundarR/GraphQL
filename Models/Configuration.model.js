import { Schema, model } from "mongoose";
const configuration = new Schema(
  {
    role: [{ type: String }],
  },
  {
    collection: "configuration",
  }
);

export default model("configuration", configuration);
