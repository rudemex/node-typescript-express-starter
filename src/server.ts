import express = require('express');
const app: express.Application = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('App is listening on port 3000!');
});
