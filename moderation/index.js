const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

const PORT = 4003;
const START_SERVER_MESSAGE = `Moderation service is running on port ${PORT}`;

// Moderate the comment, and send the result to the event bus.
app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "COMMENT_CREATED") {
    const status = data.content.includes("orange") ? "REJECTED" : "APPROVED";

    await axios.post("http://localhost:4005/events", {
      type: "COMMENT_MODERATED",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      }
    })
  }

  res.send({});
})

// Start the server.
app.listen(PORT, () => {
  console.log(START_SERVER_MESSAGE);
});