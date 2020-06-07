
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
enum MSG_TYPE {
    JOINED = 'joined', //called when we join
    OTHER_JOINED = 'other_joined' // called when another client joins
}

const io = socket(server);


var connected: string[] = [];

io.on('connection', (socket) => {

    console.log('successfully created socket connection');

    //when someone connects
    socket.on(MSG_TYPE.JOINED, (data: {address: string}) => {

        //first, tell the newly connected client our current list connected addresses
        socket.emit(MSG_TYPE.JOINED, {connected: connected});

        //now add that new client to our master list
        connected.push(data.address);

        //and tell everyone else that someone has joined
        socket.broadcast.emit(MSG_TYPE.OTHER_JOINED, {new_address: data.address});

    });

});

