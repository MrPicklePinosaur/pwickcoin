import { Block } from './Block'
import { Validation } from './Validation'

//listens for transaction requests and tries to produce a valid block with transations included, then broadcast

export default class Miner {

    
    //mining
    /*
    generateBlock(blockData: string) {
        const prevBlock = this.getPreviousBlock();
        const nextInd = (prevBlock!=null) ? prevBlock.index+1 : 0; //if there is no previous, it's a genesis and set ind to 0
        const prevHash = (prevBlock!=null) ? prevBlock.hash : '';
        const timeStamp = new Date().getTime()/1000;

        //insert diffiulty adjustment
        const difficulty = 10; //PLACEHOLDER

        const proof = Blockchain.calculateProofOfWork(nextInd,prevHash,timeStamp,blockData,difficulty); //PLACEHOLDER

        const hash = Block.calculateHash(nextInd,prevHash,timeStamp,blockData,difficulty,proof);
        const newBlock = new Block(nextInd,hash,prevHash,timeStamp,blockData,difficulty,proof);
        return newBlock;
    }
    */

    //mine for proof of work value
    static calculateProofOfWork(index: number, prevHash: string, timeStamp: number, blockData: string, difficulty: number): number {

        var curProof = 0;
        while(true) { //commence le mining

            const newHash = Block.calculateHash(index,prevHash,timeStamp,blockData,difficulty,curProof);
            //check to see if the hash matches the difficulty
            if (Validation.verifyProofOfWork(newHash,difficulty)) {
                return curProof;
            }

            curProof+=1;
        }
    }

}