import { Transaction } from './transaction.service'
import { Block, calculateBlockHash } from './block.service'
import { verifyProofOfWork } from './validation.service'

export const calculateProofOfWork = (index: number, prevHash: string, timeStamp: number, blockData: string, difficulty: number): number => {

    let curProof = 0;
    //while(true) { //commence le mining
    for (let i = 0; i < 1000000; i++) {
 
        const newHash = calculateBlockHash(index,prevHash,timeStamp,blockData,difficulty,curProof);
        //check to see if the hash matches the difficulty
        if (verifyProofOfWork(newHash,difficulty)) {
            return curProof;
        }

        curProof+=1;
    }
    return 0;
}


export const generateBlock = (transactions: Transaction[], blockchain: Block[]): Block => {
    const prevBlock = (blockchain.length>0)?blockchain[blockchain.length-1]:null; //get the kast block in chain

    const nextInd = (prevBlock!=null) ? prevBlock.index+1 : 0; //if there is no previous, it's a genesis and set ind to 0
    const prevHash = (prevBlock!=null) ? prevBlock.hash : '';
    const timeStamp = new Date().getTime()/1000;

    //insert diffiulty adjustment
    const difficulty = 5; //PLACEHOLDER

    //hardcoded blockreward for now

    //transactions.unshift(blockReward); //the miner adds a reward for themself
    const blockData = JSON.stringify(transactions);

    const proof = calculateProofOfWork(nextInd,prevHash,timeStamp,blockData,difficulty); //PLACEHOLDER

    const hash = calculateBlockHash(nextInd,prevHash,timeStamp,blockData,difficulty,proof);
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
