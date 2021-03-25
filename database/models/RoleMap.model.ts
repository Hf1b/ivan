import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

export interface IRole extends Document {
  name: string;
  id: string;
}

const RoleSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  id: { type: String, required: true, unique: true },
});

export default mongoose.model<IRole>("RoleMap", RoleSchema);
