const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");
const corsOptions = require("./config/corsOptions");
const PORT = process.env.PORT || 5000;

// custom middleware logger
app.use(logger);

// cross origin resource sharing
app.use(cors(corsOptions));

// middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/refresh", require("./routes/refresh"));

// verified jwt routes
app.use(verifyJWT);
app.use("/employees", require("./routes/api/employees"));

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// app.all("*", (req, res) => {
//   res.status(404);
//   if (req.accepted("html")) {
//     res.sendFile(path.join(__dirname, "views", "404.html"));
//   } else if (req.accepted("json")) {
//     res.json({ error: "404 not found" });
//   } else {
//     res.type("txt").send("404 not found");
//   }
// });

// error Handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
