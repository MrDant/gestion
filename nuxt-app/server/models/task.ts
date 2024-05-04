import { Schema, model, SchemaTypes } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    properties: {
      status: { type: String, default: "Not started" },
      icon: { type: String, default: "i-heroicons-ticket" },
      "date-start": { type: String },
      others: { type: [SchemaTypes.Mixed], default: [] },
    },
    parent: { type: SchemaTypes.ObjectId, ref: "task" },
    content: { type: String, default: "" },
    project: { default: null, type: SchemaTypes.ObjectId, ref: "project" },
  },
  { strict: false }
);

const Model = model("task", schema);
export default Model;
