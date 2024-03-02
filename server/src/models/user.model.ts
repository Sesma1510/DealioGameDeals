import mongoose, {Schema, Document} from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  profileImage: string;
  favoriteGames: Array<{ gameId: string; title: string; }>;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  profileImage: { type: String, required: false },
  favoriteGames: [{
    gameId: { type: String, required: true },
    title: { type: String, required: true },
  }],
});

const User = mongoose.model<IUser>("User", UserSchema);

export {User};
