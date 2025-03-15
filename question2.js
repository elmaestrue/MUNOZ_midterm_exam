const express = require('express');
const app = express();
const PORT = 3000;

// Create a router for the /test endpoint
const testRouter = express.Router();

testRouter.get('/', (req, res) => {
  res.json({ message: 'Express is working! Write your full name' });
});

// Mount the router on the /test path
app.use('/test', testRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});
