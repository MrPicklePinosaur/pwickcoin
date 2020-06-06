
import express from 'express'
import socket from 'socket.io'

import { pwickcoinRouter } from './api/routes/pwickcoin'

const app = express();

const router = express.Router();

router.get('/', (req, res) => {
    res.send('hello worldo');
});

app.use('/', router);
app.use('/pwickcoin', pwickcoinRouter);

const server = app.listen(5000, () => {
    console.log('listening on 5000');
});

//socket 
const io = socket(server);

io.on('connection', (clientSocket) => {
    console.log('successfully created socket connection');
});