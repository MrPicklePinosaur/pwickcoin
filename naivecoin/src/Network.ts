import io from 'socket.io-client'
import { Wallet } from './Wallet';
import { Blockchain } from './Blockchain';
import { Transaction, UnspentTransOut } from './Transaction';
import { Miner } from './Miner';
import { Block } from './Block';
import { Validation } from './Validation';

enum MSG_TYPE {
    JOINED = 'joined', //called when we join
    OTHER_JOINED = 'other_joined', // called when another client joins
    NEW_BLOCK = 'new_block', //called when a new block is mined
}

export class Network {
    //list of people on the network - in the future, replace with friend system and query the
    //public key from a db or sm
    addresses: string[] = [];
    socket: SocketIOClient.Socket;

    //user info
    wallet: Wallet;
    blockchain: Blockchain; //our local copy of the blockchain
    unspentTrans: UnspentTransOut[] = [];

    constructor(serverUrl: string) {

        //init user info
        this.wallet = new Wallet();
        this.blockchain = new Blockchain();

        //server stuffos
        this.socket = io.connect(serverUrl);

        this.socket.on('connect', () => {
            console.log(`Connected to ${serverUrl}`);

            //broadcast public key (THIS IS TEMP)
            this.socket.emit(MSG_TYPE.JOINED, {address: this.wallet.publicKey});
        });

        //when we first establish connection, the server will give us a list of other clients
        this.socket.on(MSG_TYPE.JOINED, (data: {connected: string[]}) => {
            console.log(data);
            console.log(`Joined server with ${data.connected.length} connected clients`);
            this.addresses = data.connected;
        });

        //when someone else joins, we just add them to our list
        this.socket.on(MSG_TYPE.OTHER_JOINED, (data: {new_address: string}) => {
            console.log(`User with address ${data.new_address.substring(0,10)}... has joined`);
            this.addresses.push(data.new_address);
        });

        //when someone finds a block
        this.socket.on(MSG_TYPE.NEW_BLOCK, (data: {block: string}) => {
            
            var newBlock: Block = JSON.parse(data.block);
            console.log(`new block has been found ${newBlock.hash}`);

            //do verification stuff here and stuffs


            //add it to our block chain
            this.blockchain.blockchain.push(newBlock);

            //we can also check to see if our current blockchain (as a whole) is valid
            if (!Validation.validateBlockChain(this.blockchain.blockchain)) {
                console.log('our blockchain is INVALID!!');
            }

        });

        this.startMining();

    }

    startMining() {

        setInterval(() => {

            var transactions: Transaction[] = []; //the transaction the miner recieves
            var block_reward: Transaction = new Transaction([], [{address: this.wallet.publicKey,amount: 100}]);
            var newBlock = Miner.generateBlock(transactions, block_reward, this.blockchain);
            
            //tell everyone that we found a new block
            //console.log(`we found a block ${newBlock.hash}`);
            this.socket.emit(MSG_TYPE.NEW_BLOCK, {block: JSON.stringify(newBlock)});
            //this.blockchain.blockchain.push(newBlock);
        }, 2000);
    }

}