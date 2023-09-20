import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    default: null,
  },
  todo: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;