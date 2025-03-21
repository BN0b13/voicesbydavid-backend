import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes/index.js';

import Cron from './services/Cron.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cron = new Cron();

cron.backup();
cron.updateSSL();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: false
  })
);

//Prod
// app.use(cors({
  //   origin: ['https://voicesbydavid.com', 'https://www.voicesbydavid.com', 'https://admin.voicesbydavid.com']
  // }));
  
app.use(cors({ origin: '*' }));

app.disable('x-powered-by');
  
app.use(express.static(__dirname + '/public', { acceptRanges: true }));
app.use('/', routes);

app.listen(port, () => console.log(`Voices By David Backend listening on port ${port}.`));