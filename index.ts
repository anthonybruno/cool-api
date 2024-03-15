import express, { Express, Request, Response, Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getSavedData, runScheduler, evalColdStart } from './utils';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 2222;

app.use(cors());

// Default JSON return
app.get('/', (req: Request, res: Response) => {
  res.json(getSavedData());
});

// Test for cold start to pull data
evalColdStart();

// Fire up the scheduler
runScheduler();

app.listen(port, () => {
  console.log(`Server at http://localhost:${port}`);
});
