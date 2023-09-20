import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
  },
});

export default model("Todo", todoSchema);
