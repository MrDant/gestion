import { Schema, model, SchemaTypes } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    properties: {
      status: { type: String, default: "Not started" },
      icon: { type: String, default: "i-heroicons-ticket" },
      others: { type: [SchemaTypes.Mixed], default: [] },
    },
    parent: { type: SchemaTypes.ObjectId, ref: "task" },
    content: { type: String, default: "" },
  },
  { strict: false }
);

const Model = model("task", schema);
export default Model;
