import { Blockchain } from './Blockchain'

import io from 'socket.io-client'

enum MSG {
    NEW_TRANSACTION
}

const bc = new Blockchain();

const socket = io.connect('http://localhost:5000');

//socket.emit();
