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

  const comments = commentsByPostId[req.params.id] || [];

  comments.push({ id: commentId, content, status: "PENDING" });

  commentsByPostId[req.params.id] = comments;

  console.log("Comment Created", comments);

  await axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
      status: "PENDING",
    },
  });

  res.status(201).send(comments);
});

// Route handler for receiving queries from the event bus.
app.post("/events", async (req, res) => {
  console.log("Received event: ", req.body.type);

  const { type, data } = req.body;

  // If the event type is COMMENT_MODERATED, then update the status of the comment.
  if (type === "COMMENT_MODERATED") {
    const { id, postId, status, content } = data;

    // Get the list of comments for the given post id.
    const comments = commentsByPostId[postId] || [];

    // Find the comment with the ID given in the request.
    const comment = comments.find((comment) => {
      return comment.id === id;
    })

    // Update the status of the comment.
    comment.status = status;

    // Make a post request to the event bus with the updated comment.
    await axios.post("http://localhost:4005/events", {
      type: "COMMENT_UPDATED",
      data: {
        id,
        postId,
        status,
        content,
      },
    })
  }

  res.send({});
});

// Start the server.
app.listen(4001, function() {
  console.log("Comments server is running on port 4001");
});
