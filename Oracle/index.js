const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Body parser middleware
app.use(bodyParser.json());

// Oracle endpoint
app.post('/submit', (req, res) => {
  console.log('Data received from smart contract:', req.body);

  res.json({ status: 'success', message: 'Data received successfully' });
});

app.listen(PORT, () => {
  console.log(`Oracle server is running on http://localhost:${PORT}`);
});
