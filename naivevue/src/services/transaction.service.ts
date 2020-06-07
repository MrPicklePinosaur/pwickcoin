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

export type Transaction = {
    hash: string; //calculated using the contents of transInList and transOutList
    transInList: TransIn[];
    transOutList: TransOut[];
}

//only use when transaction object is full
export const calculateTransactionHash = (transInList: TransIn[], transOutList: TransOut[]): string => {

    const transInString = transInList
        .map(({outId, outIndex}: TransIn) => outId+outIndex )
        .reduce((acc, cur) => acc+cur, '');

    const transOutString = transOutList
        .map(({address, amount}: TransOut) => address+amount )
        .reduce((acc, cur) => acc+cur, '');

        
    return sha256(transInString+transOutString).toString();

}