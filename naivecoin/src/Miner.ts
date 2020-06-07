import { Block } from './Block'
import { Validation } from './Validation'
import { Blockchain } from './Blockchain';
import { Transaction } from './Transaction';

//listens for transaction requests and tries to produce a valid block with transations included, then broadcast

export class Miner {

    //mining
    


    //prob dont need to have blockreward as param
    static generateBlock(transactions: Transaction[], blockReward: Transaction,blockchain: Blockchain): Block {
        const chain = blockchain.blockchain;
        const prevBlock = (chain.length>0)?chain[chain.length-1]:null;

        const nextInd = (prevBlock!=null) ? prevBlock.index+1 : 0; //if there is no previous, it's a genesis and set ind to 0
        const prevHash = (prevBlock!=null) ? prevBlock.hash : '';
        const timeStamp = new Date().getTime()/1000;

        //insert diffiulty adjustment
        const difficulty = 5; //PLACEHOLDER

        transactions.unshift(blockReward); //the miner adds a reward for themself
        const blockData = JSON.stringify(transactions);

        const proof = Miner.calculateProofOfWork(nextInd,prevHash,timeStamp,blockData,difficulty); //PLACEHOLDER

        const hash = Validation.calculateBlockHash(nextInd,prevHash,timeStamp,blockData,difficulty,proof);
        const newBlock: Block = {
            index: nextInd,
            hash: hash,
            previousHash: prevHash,
            timeStamp: timeStamp,
            data: blockData,
            difficulty: difficulty,
            proof: proof
        };
        return newBlock;
    }
    

    //mine for proof of work value
    static calculateProofOfWork(index: number, prevHash: string, timeStamp: number, blockData: string, difficulty: number): number {

        var curProof = 0;
        while(true) { //commence le mining

            const newHash = Validation.calculateBlockHash(index,prevHash,timeStamp,blockData,difficulty,curProof);
            //check to see if the hash matches the difficulty
            if (Validation.verifyProofOfWork(newHash,difficulty)) {
                return curProof;
            }

            curProof+=1;
        }
    }

}