import sha256 from 'crypto-js/sha256'

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

export const calculateBlockHash = (index: number, previousHash: string, timeStamp: number, data: string, difficulty: number, proof: number): string => {
    return sha256(index+previousHash+timeStamp+data+difficulty+proof).toString();
}