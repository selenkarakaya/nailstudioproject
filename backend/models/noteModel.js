const mongoose = require("mongoose");

var noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    ticket: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Ticket",
    },
    text: {
      type: String,
      required: true,
    },

    photo: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", noteSchema);
