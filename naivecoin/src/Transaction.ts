import sha256 from 'crypto-js/sha256'
import * as ecdsa from 'elliptic'

export const ec = new ecdsa.ec('secp256k1');

export type TransIn = {

    outId: string, //owner of the money
    outIndex: number, //reference to the TransOut that the money came from
    signature: string
}

export type TransOut = {
    address: string, //target of transaction
    amount: number 
}

export type UnspentTransOut = { //leftover money from transaction, made as a transaction to self
    readonly id: string,  
    readonly index: number, //value to reference this blob of money
    readonly address: string, //owner of the money
    readonly amount: number
}

export class Transaction {

    public id: string = ''; //a random string (should be 256 bits)
    public hash: string = '';
    public transInList: TransIn[] = [];
    public transOutList: TransOut[] = [];

    constructor() {
        //generate a random id for this
    }

    //only use when transaction object is full
    calculateTransactionHash(): string {

        const transInString = this.transInList
            .map(({outId, outIndex}: TransIn) => outId+outIndex )
            .reduce((acc, cur) => acc+cur, '');

        const transOutString = this.transOutList
            .map(({address, amount}: TransOut) => address+amount )
            .reduce((acc, cur) => acc+cur, '');

        return sha256(this.id+transInString+transOutString).toString();

    }

    //not finished
    static signTransaction({id, transInList}: Transaction, transInIndex: number, privateKey: string): string {

        const transIn = transInList[transInIndex]; //the specific transaction we are signing

        const key = ec.keyFromPrivate(privateKey,'hex');
        const signature = Transaction.toHexString(key.sign(id).toDER()); 

        return signature;
    }

    //from https://github.com/lhartikk/naivecoin/blob/chapter3/src/transaction.ts
    static toHexString(byteArray: string) {
        return Array.from(byteArray, (byte: any) => {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    };

    static generateKeyPair() {
        return ec.genKeyPair();
    }



}