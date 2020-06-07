
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