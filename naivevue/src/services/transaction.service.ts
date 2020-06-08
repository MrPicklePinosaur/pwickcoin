import sha256 from 'crypto-js/sha256'
import { toHexString } from './helper.service'
import { getKeyForSignature } from './key.service'

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

export const createNewTransaction = (recipentAddress: string, senderAddress: string, amount: number, senderUnspent: UnspentTransOut[]): Transaction  => {

    const {unspentToUse, overpay} = findUnspentForTransaction(amount,senderUnspent);

    //generate the inputs to the transaction by converting unspent into input tokens
    var transIn: TransIn[] = unspentToUse.map(({id,index}: UnspentTransOut) => {
        return {
            outId: id,
            outIndex: index,
            signature: ''
        };
    });

    //generate 
    var transOut: TransOut[] = [];

    transOut.push({ //the token we pay to the recipient
        address: recipentAddress,
        amount: amount
    });
    if (overpay > 0) { //the token we pay ourselves as change
        transOut.push({ 
            address: senderAddress,
            amount: overpay
        });
    }

    //calculate transaction hash
    const hash = calculateTransactionHash(transIn, transOut);
    const newTrans = { 
        hash: hash, 
        transInList: transIn, 
        transOutList: transOut 
    };  

    return newTrans;

}

//generates the trans out objects for a given transaction
export const findUnspentForTransaction = (amount: number, senderUnspent: UnspentTransOut[]) => {
    var curValue = 0;
    var unspentToUse: UnspentTransOut[] = []; //the tokens we will use to make the payment
    
    for (const unspent of senderUnspent) {
        curValue += unspent.amount;
        unspentToUse.push(unspent);

        //once we have found enough tokens to make the payment
        if (curValue >= amount) {
            const overpay = curValue - amount; //make 'change'
            return { unspentToUse: unspentToUse, overpay: overpay };
        }
    }
    //if we didnt have enough coins
    throw Error('Not enough balance to make payment');
}

//sign all input transactions
export const signTransaction = ({hash,transInList}: Transaction, privateKey: string) => {
    transInList
    .map((transIn) => {
        const key = getKeyForSignature(privateKey);
        transIn.signature = toHexString(key.sign(hash).toDER());
    });
}

//UPON RECIEVING NEW BLOCK

export const updateUnspent = (newTransactions: Transaction[], curUnspent: UnspentTransOut[]) => {
    //verify the validity of the transaction here

    //now update the local unspent
    const newUnspent = getAllUnspent(newTransactions);
    const consumedUnspent = getAllConsumed(newTransactions);

    return curUnspent
    .filter((unspent) => !findUnspent(consumedUnspent,unspent))
    .concat(newUnspent);
}


//grab all out transactions, create new unspent objects and add to personal list
export const getAllUnspent = (newTransactions: Transaction[]): UnspentTransOut[] => {
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
export const getAllConsumed = (newTransactions: Transaction[]): UnspentTransOut[] => {
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
    
//note: this only finds unspent object that matches with the id and index ONLY
export const findUnspent = (consumedUnspent: UnspentTransOut[], {id, index}: UnspentTransOut): boolean => {
    for (const u of consumedUnspent) {
        if (u.id === id && u.index === index) {
            return true;
        }
    }
    return false;
}