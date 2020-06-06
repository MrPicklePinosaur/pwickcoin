import sha256 from 'crypto-js/sha256'


export class Block {

    public index: number;
    public hash: string;
    public previousHash: string;
    public timeStamp: number;
    public data: string;

    //proof of work
    public difficulty: number; //current difficulty
    public proof: number; 

    constructor(index: number, hash: string, previousHash: string, timeStamp: number, data: string, difficulty: number, proof: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timeStamp = timeStamp;
        this.data = data;

        this.difficulty = difficulty;
        this.proof = proof;
    }

    static calculateHash(index: number, previousHash: string, timeStamp: number, data: string, difficulty: number, proof: number): string {
        return sha256(index+previousHash+timeStamp+data+difficulty+proof).toString();
    }
}