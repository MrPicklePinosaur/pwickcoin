import { Blockchain } from './Blockchain'
//import { Miner } from './Miner'

import io from 'socket.io-client'

enum MSG {
    NEW_TRANSACTION
}

const bc = new Blockchain();

const socket = io.connect('http://localhost:5000');

//start mining for genesis


//socket.emit();
