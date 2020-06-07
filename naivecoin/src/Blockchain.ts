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

    //update chain if the new one is valid and it had more computational power put into it
    updateChain(newChain: Block[]) {
        if (Validation.validateBlockChain(newChain) && Blockchain.cumulativeDifficulty(newChain) > Blockchain.cumulativeDifficulty(this.blockchain)) {
            //use new chain 
            this.blockchain = newChain;
            //broadcast the message
            console.log('accepted new');
        }
        
    }

    //calculate the difficulty it took to generate this chain
    static cumulativeDifficulty(blockchain: Block[]): number { 

        var difficulty = 0;
        for (const b of blockchain) {
            difficulty += Math.pow(2,b.difficulty);
        }
        return difficulty;

    }


    //adjusting difficulty of block: do later

}