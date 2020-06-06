import { Block } from './Block'
import sha256 from 'crypto-js/sha256'

export class Blockchain {

    public blockchain: Block[] = [];

    constructor() {
        this.generateBlock(''); //genesis block

    }

    static calculateHash(index: number, previousHash: string, timeStamp: number, data: string): string {
        return sha256(index+previousHash+timeStamp+data).toString();
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
    
    getPreviousBlock(): Block {
        return this.blockchain[this.blockchain.length-1];
    }

}