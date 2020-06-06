import { Block } from './Block'
import { Validation } from './Validation';

//each user's personal blockchain

export class Blockchain {

    public blockchain: Block[] = [];

    constructor() {
        
    }

    private getPreviousBlock(): Block {
        return this.blockchain[this.blockchain.length-1];
    }

    //update chain if the new one is valid and it's longer than the current one
    updateChain(newChain: Block[]) {
        if (Validation.validateBlockChain(newChain) && newChain.length > this.blockchain.length) {
            //use new chain 
            this.blockchain = newChain;
            //broadcast the message
            console.log('accepted new');
        }
        
    }


    //adjusting difficulty of block: do later

}