import { Blockchain } from './Blockchain'
import { Miner } from './Miner'
import { Wallet } from './Wallet'
import { Transaction } from './Transaction'
import { Network } from './Network'

//init server

/*
var w = new Wallet();
const bc = new Blockchain();

var transactions: Transaction[] = []; //the transaction the miner recieves
var block_reward: Transaction = new Transaction([], [{address: w.publicKey,amount: 100}]);
var newBlock = Miner.generateBlock(transactions, block_reward, bc);
bc.blockchain.push(newBlock);
console.log(bc);
*/
var network = new Network('http://localhost:5000');
