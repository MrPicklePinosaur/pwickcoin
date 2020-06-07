import sha256 from 'crypto-js/sha256'
import * as ecdsa from 'elliptic'

export const ec = new ecdsa.ec('secp256k1');

export type TransIn = {
    id: string,
    index: number,
    signature: string;
}

export type TransOut = {
    address: string, //target of transaction
    amount: number
}

export class Transaction {

    public id: string = '';
    public transIn: TransIn[] = [];
    public transOut: TransOut[] = [];

    constructor() {

    }

    calculateTransactionId(): string {

        const transInString = this.transIn
            .map(({id, index}: TransIn) => id+index )
            .reduce((acc, cur) => acc+cur, '');

        const transOutString = this.transOut
            .map(({address, amount}: TransOut) => address+amount )
            .reduce((acc, cur) => acc+cur, '');

        return sha256(transInString+transOutString).toString();

    }

    signTransaction(transInIndex: number, privateKey: string): string {

        return '';
    }



}