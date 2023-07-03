import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from './router';
import mongoose from 'mongoose';

const app = express();

app.use(cors({
  credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});

const MONGO_URL = 'mongodb+srv://dafewealth:FMAIpRhKanWKAzex@huiospay.rtqv4hf.mongodb.net/?retryWrites=true&w=majority'; // DB URI



mongoose.Promise = Promise;
mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL);
console.log(`Database connected successfully:`)
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());
