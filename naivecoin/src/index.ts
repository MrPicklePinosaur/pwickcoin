import { Blockchain } from './Blockchain'

import io from 'socket.io-client'

const serverSocket = io.connect('http://localhost:5000');

const bc = new Blockchain();

/*
console.log(bc.blockchain);

console.log(bc.validateBlockChain(bc.blockchain));
*/