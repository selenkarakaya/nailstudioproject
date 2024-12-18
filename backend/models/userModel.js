const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
    },
    address: {
      type: String,
      required: [true, "Please add a address"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    photoURL: { type: String, default: "" },

    isAdmin: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
