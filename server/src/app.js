require('dotenv').config(); 

const verifyContent = require('./controller/scraper-controller');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

// Port to listen on (replace with a suitable port number)
const port = 3000;

// Example route to handle incoming requests
app.get('/', (req, res) => {
  res.send('Hello from your Node.js server!');
});

app.get('/verify-content', async (req, res) => {

  let result = await verifyContent(req.query.siteURL, req.query.figmaContent)

  res.json(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
