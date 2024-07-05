const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4002;

let posts = {};

// Get the list of all posts.
app.get("/posts", (req, res) => {
  console.log("Posts: ", posts);
  res.send(posts);
});

// This is the route handler for receiving queries form the event bus.
app.post("/events", (req, res) => {
  const { type, data } = req.body;

  // If the event type is POST_CREATED, add the post to the posts object.
  if (type === "POST_CREATED") {
    const { id, title } = data;
    console.log("Post created: ", data);

    posts[id] = { id, title, comments: [] };
  }

  // If the event type is COMMENT_CREATED, add the comment to the post.
  if (type === "COMMENT_CREATED") {
    const { id, content, postId } = data;
    const post = posts[postId];

    console.log("Comment created: ", data);

    post.comments.push({ id, content });
  }

  console.log("Posts: ", posts);
  res.send({});
});

// Start the server.
app.listen(PORT, () => {
  console.log(`Query server is running on port ${PORT}`);
})