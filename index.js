import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import {
  signInPost,
  signUpPost,
  transactionPost,
  transactionsGet
} from './assets/routesFunctions';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());

server.post('/sing-up', signUpPost);
server.post('/sing-in', signInPost);
server.get('/transactions', transactionsGet);
server.post('/transaction:way', transactionPost);
