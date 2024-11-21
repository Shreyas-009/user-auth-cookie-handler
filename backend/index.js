const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 8080;
const SECRET_KEY = "secret101";

let users = [];

// Middleware
app.use(
  cors({
    origin: "https://user-auth-cookie-handler.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  })
);
app.use(express.json());
app.use(cookieParser());

// Server health check
app.get("/", (req, res) => {
  res.send("Server is working");
});

// Register route
app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }

  // Check if email already exists
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  // Create new user
  const user = { username, email, password };
  users.push(user);

  res.status(200).json({
    data: user,
    message: "Registration successful",
  });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }

  const foundUser = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!foundUser) {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }

  // Generate JWT token
  const tokenPayload = {
    username: foundUser.username,
    email: foundUser.email,
  };

  const token = jwt.sign(tokenPayload, SECRET_KEY, { expiresIn: "1h" });

  // Set cookie
  res.cookie("authToken", token, { httpOnly: true, maxAge: 3600000 }); 
  res.status(200).json({
    data: token,
    message: "Login successful",
  });
});

// Protected route
app.post("/protected", (req, res) => {
  const token = req.cookies.authToken; 

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    res.json({
      message: "Access granted",
      user: decoded,
    });
  } catch (err) {
    res.status(403).json({
      message: "Invalid token",
    });
  }
});

// Response codes and JSON data route
app.get("/response/:code", (req, res) => {
  const { code } = req.params;
  const responseCode = parseInt(code);

  switch (responseCode) {
    case 200:
      res.status(200).json({ message: "OK", data: "This is a 200 response." });
      break;
    case 201:
      res
        .status(201)
        .json({ message: "Created", data: "This is a 201 response." });
      break;
    case 400:
      res
        .status(400)
        .json({ message: "Bad Request", error: "This is a 400 error." });
      break;
    case 404:
      res
        .status(404)
        .json({ message: "Not Found", error: "This is a 404 error." });
      break;
    case 500:
      res
        .status(500)
        .json({
          message: "Internal Server Error",
          error: "This is a 500 error.",
        });
      break;
    default:
      res.status(400).json({ message: "Invalid status code!" });
  }
});

// Catch-all error handler
app.use("*", (req, res) => {
  res.status(404).send("Page Not Available");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
