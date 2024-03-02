import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    favoriteGames: [{
            gameId: { type: String, required: true },
            title: { type: String, required: true },
        }],
});
const User = mongoose.model("User", UserSchema);
export { User };
