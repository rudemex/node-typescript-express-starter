import express, { Request, Response } from 'express';
import signale from './utils/signale';

const app = express();
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  signale.success('App is listening on port 3000!');
});
