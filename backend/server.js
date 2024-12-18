const path = require("path");
const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const fileupload = require("express-fileupload");
const { errorHandle } = require("./middleware/errorHandle");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 8000;
const app = express();

// Connect to DB
connectDB();

// for body parser  middleware(if not body will be undefined data)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("hello");
});
app.use(fileupload());
app.use(express.static(path.join(__dirname, "public")));

let cors = require("cors");
app.use(cors());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tickets", require("./routes/ticketRoutes"));
app.use(errorHandle);
app.listen(PORT, () => console.log(`SERVER STARTED ON PORT ${PORT}`));
