const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const { randomBytes } = require("crypto");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4000;
const ERROR_TITLE_REQUIRED = "Title is required";
const START_SERVER_MESSAGE = "Posts server is running on port 4000";

// Instantiate the posts object.
let posts = {};

// Get the list of all posts.
app.get("/posts", (req, res) => {
  res.send(posts);
});

// Create a new post.
app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  // If no title is provided, return an error.
  !title && res.status(400).send({ error: ERROR_TITLE_REQUIRED });

  // Add the data to the posts object.
  posts[id] = { id, title };
  console.log("Post Created", posts[id]);

  // Send an event POST_CREATED to the event bus.
  await axios.post("http://localhost:4005/events", {
    type: "POST_CREATED",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

// Route handler for receiving queries from the event bus.
app.post("/events", (req, res) => {
  console.log("Received event: ", req.body.type);
  res.send({});
});

// Start the server.
app.listen(PORT, () => {
  console.log(START_SERVER_MESSAGE);
});
