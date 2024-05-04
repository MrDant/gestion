import { Schema, model, SchemaTypes } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    content: { type: String, default: "" },
    icon: { type: String },
  },
  { strict: false }
);

const Model = model("project", schema);
export default Model;
