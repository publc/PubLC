const express = require('express');
const bodyParser = require('body-parser');

// My dependencies
const router = require('./libs/router');
const Response = require('./libs/response');

const port = process.env.PORT || 4500;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  req.response = new Response(res);
  next();
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
