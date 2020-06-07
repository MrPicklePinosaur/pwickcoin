import sha256 from 'crypto-js/sha256'

export type TransIn = {

    outId: string, //reference to unspent money (UnspentTransOut)
    outIndex: number, 
    signature: string
    
}

export type TransOut = {
    address: string, //target of transaction
    amount: number 
}

export type UnspentTransOut = { //leftover money from transaction, made as a transaction to self
    readonly id: string,  //reference to the transaction this came from
    readonly index: number, //a unique idetifier for this blob of money (just index in array lmao)
    readonly address: string, //owner of the money
    readonly amount: number
}

//the request that each person makes
export class Transaction {

    public hash: string = ''; //calculated using the contents of transInList and transOutList
    public transInList: TransIn[] = [];
    public transOutList: TransOut[] = [];

    constructor() {
        //generate a random id for this
    }

    //only use when transaction object is full
    static calculateTransactionHash({transInList, transOutList}: Transaction): string {

        const transInString = transInList
            .map(({outId, outIndex}: TransIn) => outId+outIndex )
            .reduce((acc, cur) => acc+cur, '');

        const transOutString = transOutList
            .map(({address, amount}: TransOut) => address+amount )
            .reduce((acc, cur) => acc+cur, '');

        return sha256(transInString+transOutString).toString();

    }

    //not finished
    /*
    static signTransaction({hash,transInList}: Transaction, transInIndex: number, privateKey: string): string {

        const transIn = transInList[transInIndex]; //the specific transaction we are signing

        const key = ec.keyFromPrivate(privateKey,'hex');
        const signature = Transaction.toHexString(key.sign(hash).toDER()); 

        return signature;
    }
    */


    //UPON RECIEVING NEW BLOCK

    //grab all out transactions, create new unspent objects and add to personal list
    getAllUnspent(newTransactions: Transaction[]): UnspentTransOut[] {
        return newTransactions
            .map((trans) => {
                return trans.transOutList.map((outTrans, i) => {
                    return {
                        id: trans.hash, 
                        index: i,
                        address: outTrans.address,
                        amount: outTrans.amount
                    };
                });
            })
            .reduce((a,b) => a.concat(b), []);
    }
    
    //grab all in transactions and remove the unspent objects that those reference from our personal list
    getAllConsumed(newTransactions: Transaction[]): UnspentTransOut[] {
        return newTransactions
            .map((trans) => trans.transInList) //grab all transIns from each transaction
            .reduce((a,b) => a.concat(b), []) //make it into a 1D array
            .map((transIn) => {
                return { //create placeholder unspent object, just so we can filter by id and index later
                    id: transIn.outId,
                    index: transIn.outIndex,
                    address: '',
                    amount: 0
                }
            });
    }

    //helpers

    //from https://github.com/lhartikk/naivecoin/blob/chapter3/src/transaction.ts
    static toHexString(byteArray: string) {
        return Array.from(byteArray, (byte: any) => {
            return ('0' + (byte & 0xFF).toString(16)).slice(-2);
        }).join('');
    };

}