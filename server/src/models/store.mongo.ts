
import mongoose, { Schema, Document } from "mongoose";

interface IStore extends Document {
  storeID: string;
  storeName: string;
  isActive: boolean;
  images: {
    banner: string;
    logo: string;
    icon: string;
  };
}

const StoreSchema: Schema = new Schema({
  storeID: { type: String, required: true, unique: true },
  storeName: { type: String, required: true },
  isActive: { type: Boolean, required: true },
  images: {
    banner: { type: String, required: true },
    logo: { type: String, required: true },
    icon: { type: String, required: true }
  }
});

const Store = mongoose.model<IStore>("Store", StoreSchema);

export { Store };
