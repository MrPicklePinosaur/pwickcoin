import * as ecdsa from 'elliptic'
import { Blockchain } from './Blockchain';

export const ec = new ecdsa.ec('secp256k1');

export class Wallet {

    private privateKey: string; //this is non-persistant for now, possibly store in local storage later
    public publicKey: string; //also know as the address

    constructor() {
        this.privateKey = Wallet.generatePrivateKey();
        this.publicKey = Wallet.generatePublicKey(this.privateKey);
    }

    /*
    static getWalletBalance(blockchain: Blockchain): number {

    }
    */

    static generatePublicKey(privateKey: string): string {
        const key = ec.keyFromPrivate(privateKey,'hex');
        return key.getPublic().encode('hex',false); //256 bit
    }

    //called first time - 
    static generatePrivateKey(): string {
        const keyPair = ec.genKeyPair();
        return keyPair.getPrivate().toString(16); //hex
    }

}