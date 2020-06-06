import { Block } from './Block'

//collection of methods to validate a block

export class Validation {

    // validating methods
    
    //validateBlock() - used to validate any given block
    /* For a block to be valid
    - It's index must be one higher than the prev block
    - The current block's previous hash should match the previous block's hash
    - the current block's hash has to be valid
    
    - the proof of work must be valid
    */
    static validateBlock(block: Block, prevBlock: Block): boolean {
       
        if (prevBlock.index+1 !== block.index) {
            return false;
        } else if (prevBlock.hash !== block.previousHash) {
            return false;
        } else if (Block.calculateHash(block.index,block.previousHash,block.timeStamp,block.data,block.difficulty,block.proof) !== block.hash) {
            return false;
        } else if (Validation.verifyProofOfWork(block.hash,block.difficulty)) {
            return false;
        }

        return true;
    }
 
    static validateBlockChain(newChain: Block[]): boolean {
        
        //TODO: validate types of data recieved
        //also make sure recieved blockchain isnt empty and stuff
        
        //check if the genesis matches
        
        //go through entire chain and validate all the blocks
        for (var i = 1; i < newChain.length; i++) {
            if (!Validation.validateBlock(newChain[i],newChain[i-1])) {
                return false;
            }
        }
        
        return true;
    }
 

    //the hash must start with the same amount of zeroes as specific by the difficulty
    static verifyProofOfWork(hash: string, difficulty: number): boolean {
        //the hash comes in as hex 
        const binHash = Validation.hashHexToBin(hash);
        const prefix = '0'.repeat(difficulty); //hash must start with this many zeroes
        return binHash.startsWith(prefix);
    }

    static verifyTimeStamp() {

    }


    static hashHexToBin(hex: string): string {
        //TODO: check to make sure length of hash is right

        var result = ''
        for (const h of hex) {
            result += parseInt(h,16).toString(2).padStart(4,'0');
        }
        return result;

    }
}