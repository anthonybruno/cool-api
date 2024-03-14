import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 2222;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
