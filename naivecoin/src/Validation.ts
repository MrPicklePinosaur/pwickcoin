import { Block } from './Block'
import { Transaction } from './Transaction'
import sha256 from 'crypto-js/sha256'
//collection of methods to validate a block

export class Validation {

    // validating methods
    
    //validateBlock() - used to validate any given block
    /* For a block to be valid
    - It's index must be one higher than the prev block
    - The current block's previous hash should match the previous block's hash
    - the current block's hash has to be valid
    
    - the proof of work must be valid
    - time stamp must not be too far off
    */
    static validateBlock(block: Block, prevBlock: Block): boolean {
       
        if (prevBlock.index+1 !== block.index) {
            console.log('BLOCK VALIDATION FAILED: blocks not in order');
            return false;
        } else if (prevBlock.hash !== block.previousHash) {
            console.log('BLOCK VALIDATION FAILED: previousHash invalid');
            return false;
        } else if (Validation.calculateBlockHash(block.index,block.previousHash,block.timeStamp,block.data,block.difficulty,block.proof) !== block.hash) {
            console.log('BLOCK VALIDATION FAILED: block hash invalid');
            return false;
        } else if (!Validation.verifyProofOfWork(block.hash,block.difficulty)) {
            console.log('BLOCK VALIDATION FAILED: proof of work invalid');
            return false;
        } else if (!Validation.verifyTimeStamp(block.timeStamp,prevBlock.timeStamp)) {
            console.log('BLOCK VALIDATION FAILED: time stamp invalid');
            return false;
        }

        return true;
    }
 
    static validateBlockChain(newChain: Block[]): boolean {
        
        //TODO: validate types of data recieved
        //also make sure recieved blockchain isnt empty and stuff
        if (newChain.length == 1) {
            //validate one block only
            return true;
        }
        
        //check if the genesis matches
        
        //go through entire chain and validate all the blocks
        for (var i = 1; i < newChain.length; i++) {
            if (!Validation.validateBlock(newChain[i],newChain[i-1])) {
                console.log(`failed at block number ${i}`)
                return false;
            }
        }
        
        return true;
    }
 

    //the hash must start with the same amount of zeroes as specific by the difficulty
    static verifyProofOfWork(hash: string, difficulty: number): boolean {
        //the hash comes in as hex 
        const binHash = Validation.hashHexToBin(hash);
        const prefix = '0'.repeat(difficulty)
        //hash must start with this many zeroes
        return binHash.startsWith(prefix);
    }

    static calculateBlockHash(index: number, previousHash: string, timeStamp: number, data: string, difficulty: number, proof: number): string {
        return sha256(index+previousHash+timeStamp+data+difficulty+proof).toString();
    }

    /* verifyTimeStamp()
    a timestamp is valid if:
    - it's no less than 1 min in the future of OUR current time
    - it's no more than 1 min in the past of the prev block's timestamp
    */
    static verifyTimeStamp(timeStamp: number, prevTimeStamp: number): boolean {

        if (timeStamp-60 > Validation.currentTimeStamp()) { return false; }
        else if (prevTimeStamp-60 > timeStamp) { return false; }

        return true;
    }

    //transaction =-=-=-=-=-=-=-=
    static verifyTransactionHash(transaction: Transaction): boolean {
        return Transaction.calculateTransactionHash(transaction.transInList,transaction.transOutList) === transaction.hash;
    }

    static verifyTransactionInputs(): boolean {
        return false;
    }

    static verifyTransactionOutputs(): boolean {
        return false;
    }

    //add block_reward validation


    //helpers
    static hashHexToBin(hex: string): string {
        //TODO: check to make sure length of hash is right

        var result = ''
        for (const h of hex) {
            result += parseInt(h,16).toString(2).padStart(4,'0');
        }
        return result;

    }

    static currentTimeStamp(): number {
        return new Date().getTime()/1000;
    }
}