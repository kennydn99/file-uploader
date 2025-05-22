const express = require("express");
const session = require("express-session");
const { PrismaClient } = require("@prisma/client");
// const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const passport = require("passport");

require("dotenv").config();

// Create Express server and PrismaClient
const app = express();
const prisma = new PrismaClient();

// Set up middleware
app.use(express.urlencoded({ extended: true })); //enables server to handle data sent from html forms, parsing URL-encoded data into req body
app.use(express.json()); //Returns middleware that only parses json and only looks at requests where the Content-Type header matches the type option.

app.use(
  session({
    secret: "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Set up passport
app.use(passport.initialize());
app.use(passport.session());

// Basic test route
app.get("/", (req, res) => {
  res.send("Wecome to the File Uploader!");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
