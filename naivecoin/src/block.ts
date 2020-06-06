

export class Block {

    public index: number;
    public hash: string;
    public previousHash: string;
    public timeStamp: number;
    public data: string;

    constructor(index: number, hash: string, previousHash: string, timeStamp: number, data: string) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timeStamp = timeStamp;
        this.data = data;
    }



}