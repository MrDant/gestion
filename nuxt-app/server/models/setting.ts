import { Schema, SchemaTypes, model } from "mongoose";

const schema = new Schema(
  {
    properties: [{ type: SchemaTypes.Mixed }],
    icons: [{ type: String }],
  },
  { strict: true }
);

export default model("setting", schema);
