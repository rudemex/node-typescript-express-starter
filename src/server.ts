import express, { Request, Response } from 'express';

const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('App is listening on port 3000!');
});
