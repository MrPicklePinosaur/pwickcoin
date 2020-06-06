import { Block } from './Block'
import sha256 from 'crypto-js/sha256'

export class Blockchain {

    public blockchain: Block[] = [];

    constructor() {
        this.generateBlock(''); //genesis block
    }

    generateBlock(blockData: string) {
        const prevBlock = this.getPreviousBlock();
        const nextInd = (prevBlock!=null) ? prevBlock.index+1 : 0; //if there is no previous, it's a genesis and set ind to 0
        const prevHash = (prevBlock!=null) ? prevBlock.hash : '';
        const timeStamp = new Date().getTime()/1000;

        const hash = Blockchain.calculateHash(nextInd,prevHash,timeStamp,blockData);
        const newBlock = new Block(nextInd,hash,prevHash,timeStamp,blockData);
        this.blockchain.push(newBlock);
    }
    
    private getPreviousBlock(): Block {
        return this.blockchain[this.blockchain.length-1];
    }

    static calculateHash(index: number, previousHash: string, timeStamp: number, data: string): string {
        return sha256(index+previousHash+timeStamp+data).toString();
    }

    // validating methods

    //validateBlock() - used to validate any given block
    /* For a block to be valid
    - It's index must be one higher than the prev block
    - The current block's previous hash should match the previous block's hash
    - the current block's hash has to be valid
    */
    static validateBlock(block: Block, prevBlock: Block): boolean {

        if (prevBlock.index+1 !== block.index) {
            return false;
        } else if (prevBlock.hash !== block.previousHash) {
            return false;
        } else if (Blockchain.calculateHash(block.index,block.previousHash,block.timeStamp,block.data) !== block.hash) {
            return false;
        }

        return true;
    }

    validateBlockChain(newChain: Block[]): boolean {

        //TODO: validate types of data recieved
        //also make sure recieved blockchain isnt empty and stuff

        //check if the genesis matches
        
        //go through entire chain and validate all the blocks
        for (var i = 1; i < newChain.length; i++) {
            if (!Blockchain.validateBlock(newChain[i],newChain[i-1])) {
                return false;
            }
        }

        return true;
    }

    //update chain if the new one is valid and it's longer than the current one
    updateChain(newChain: Block[]) {
        if (this.validateBlockChain(newChain) && newChain.length > this.blockchain.length) {
            //use new chain 
            this.blockchain = newChain;
            //broadcast the message
            console.log('accepted new');
        }

    }

}