import { Blockchain } from './Blockchain'
import { Miner } from './Miner'
import { Wallet } from './Wallet'

import io from 'socket.io-client'

enum MSG {
    NEW_TRANSACTION
}

const bc = new Blockchain();

var w = new Wallet();


//const socket = io.connect('http://localhost:5000');

//start mining for genesis
/*
bc.blockchain.push(Miner.generateBlock('genesis',bc));
console.log(bc);
bc.blockchain.push(Miner.generateBlock('block 1',bc));
console.log(bc);
*/
//socket.emit();
