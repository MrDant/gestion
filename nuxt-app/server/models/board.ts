import { Schema, SchemaTypes, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    query: { type: SchemaTypes.Mixed, required: true },
    action: { type: SchemaTypes.Mixed, required: true },
  },
  { strict: true }
);

export default model("board", schema);
