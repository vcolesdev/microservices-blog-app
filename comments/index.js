const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const { randomBytes } = require("crypto");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let commentsByPostId = {};

// Get the list of all comments for a given post id.
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a new comment for a given post id.
app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  // Get the comments for the given post id.
  // Add the new comment to the comments array.
  // Save the comments back to the commentsByPostId object.
  // Send the newly created comment back to the client.
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  console.log("Comment Created", comments);

  await axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });

  res.status(201).send(comments);
});

// Route handler for receiving queries from the event bus.
app.post("/events", (req, res) => {
  console.log("Received event: ", req.body.type);
  res.send({});
});

// Start the server.
app.listen(4001, function() {
  console.log("Comments server is running on port 4001");
});
