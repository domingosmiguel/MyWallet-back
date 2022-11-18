import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import usersRoutes from './routes/usersRoutes.js';
import recordsRoutes from './routes/recordsRoutes.js';

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());
server.use(usersRoutes);
server.use(recordsRoutes);

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
