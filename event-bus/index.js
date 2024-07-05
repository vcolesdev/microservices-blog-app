const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 4005;

/**
 * Post a new event to the events service.
 * @param port
 * @param request
 * @param response
 * @returns {Promise<void>}
 */
async function postNewEvent(port, request) {
  const event = request.body;
  console.log("Posting event: ", event);
  await axios.post(`http://localhost:${port}/events`, event).catch((err) => {
    console.error(err.message);
  });
}

// Add a new event to the events service.
app.post('/events', async function(req, res) {
  const event = req.body;

  await postNewEvent(4000, req);
  await postNewEvent(4001, req);
  await postNewEvent(4002, req);

  res.send({ status: "OK" });
});

app.listen(PORT, function() {
  console.log("Events service is running on port 4005.");
});