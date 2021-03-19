import * as mongoose from "mongoose";
import { Document, Schema } from "mongoose";

export interface ISetting extends Document {
  key: string;
  value: string;
}

const SettingSchema: Schema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true },
});

export default mongoose.model<ISetting>("Setting", SettingSchema);
