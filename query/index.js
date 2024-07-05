const cors = require("cors");
const express = require("express")
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4002;

let posts = {};

function handleEvent(type, data) {
  // If the event type is POST_CREATED, add the post to the posts object.
  if (type === "POST_CREATED") {
    const { id, title } = data;
    console.log("Post created: ", data);

    posts[id] = { id, title, comments: [] };
  }

  // If the event type is COMMENT_CREATED, add the comment to the post.
  if (type === "COMMENT_CREATED") {
    const { id, content, postId, status } = data;
    const post = posts[postId];

    console.log("Comment created: ", data);

    post.comments.push({ id, content, status });
  }

  // If the event type is COMMENT_UPDATED, update the status of the comment.
  if (type === "COMMENT_UPDATED") {
    const { content, id, postId, status } = data;
    const post = posts[postId];

    // Get the comment with the given ID.
    const comment = post.comments.find((comment) => {
      return comment.id === id;
    });

    // Update the status and content of the comment.
    comment.status = status;
    comment.content = content;

    console.log("Comment updated: ", data);
  }
}

// Get the list of all posts.
app.get("/posts", (req, res) => {
  console.log("Posts: ", posts);
  res.send(posts);
});

// This is the route handler for receiving queries form the event bus.
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  // Handle the event.
  handleEvent(type, data);

  res.send({});
});

// Start the server.
app.listen(PORT, async () => {
  console.log(`Query server is running on port ${PORT}`);

  const res = await axios.get("http://localhost:4005/events");

  for (let event of res.data) {
    console.log("Processing event: ", event.type);
    handleEvent(event.type, event.data);
  }
})