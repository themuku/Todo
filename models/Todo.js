import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  }
});

export default model("Todo", todoSchema);
