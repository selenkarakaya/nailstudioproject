const mongoose = require("mongoose");

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: String,
      required: [true, "Please select a product"],
      enum: [
        "Gel nail extensions full set",
        "Gel Infills",
        "Gel overlay on natural nails",
        "Manicure with gel polish",
        "Spa pedicure with gel polish",
        "Pedicure with gel polish",
        "Nail Extension Repair",
        "Removal of gel polish/builder gel",
      ],
    },
    description: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    date: {
      type: String,
      required: [true, "Please enter a description of the issue"],
    },
    status: {
      type: String,
      required: true,
      enum: ["new", "open", "closed"],
      default: "new",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Ticket", ticketSchema);
