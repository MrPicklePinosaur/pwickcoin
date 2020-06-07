

export type Block = {

    index: number;
    hash: string;
    previousHash: string;
    timeStamp: number;
    data: string;

    //proof of work
    difficulty: number; //current difficulty
    proof: number; 
}

/*

    constructor(index: number, hash: string, previousHash: string, timeStamp: number, data: string, difficulty: number, proof: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.timeStamp = timeStamp;
        this.data = data;

        this.difficulty = difficulty;
        this.proof = proof;
    }
*/