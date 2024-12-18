const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

//@desc Get  user ticket
//@route GET /api/tickets
//@access private
const getTickets = asyncHandler(async (req, res) => {
  // Get user using id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

//@desc Get  user ticket
//@route GET /api/tickets/:id
//@access private
const getTicket = asyncHandler(async (req, res) => {
  // Get user using id
  const user = await User.findById(req.user.id);
  // check user exists
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  // check ticket exists
  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found");
  }
  // check user's id and ticket's user id are same
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorizeded");
  }
  res.status(200).json(ticket);
});

//@desc Create  new ticket
//@route POST /api/tickets
//@access private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description, date } = req.body;

  if (!product || !description || !date) {
    res.status(400);
    throw new Error("Please fill the fields");
  }

  // Get user using id
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const ticket = await Ticket.create({
    product,
    description,
    date,
    user: req.user.id,
    status: "new",
  });
  res.status(200).json(ticket);
});

//@desc Delete  user ticket
//@route Delete /api/tickets/:id
//@access private
const deleteTicket = asyncHandler(async (req, res) => {
  // Get user using id
  const user = await User.findById(req.user.id);
  // check user exists
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  // check ticket exists
  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found");
  }
  // check user's id and ticket's user id are same
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await ticket.deleteOne();

  res.status(200).json({ success: true });
});

//@desc Update  user ticket
//@route PUT /api/tickets/:id
//@access private
const updateTicket = asyncHandler(async (req, res) => {
  // Get user using id
  const user = await User.findById(req.user.id);
  // check user exists
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  const ticket = await Ticket.findById(req.params.id);
  // check ticket exists
  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found");
  }
  // check user's id and ticket's user id are same
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(ticket);
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  deleteTicket,
  updateTicket,
};
