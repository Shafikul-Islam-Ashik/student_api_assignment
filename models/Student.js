import mongoose from "mongoose";

// student schema
const studentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roll: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      trim: true,
      default: null,
    },
    location: {
      type: String,
      trim: true,
      default: null,
    },
    gender: {
      type: String,
      trim: true,
      enum: ["Male", "Female", "Custom"],
    },
    age: {
      type: Number,
      trim: true,
      default: null,
    },
    books: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Book",
      default: [],
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// create student model
export default mongoose.model("Student", studentSchema);
