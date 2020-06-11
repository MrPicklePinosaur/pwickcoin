import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

import { Block } from "../services/block.service";
import { Transaction, UnspentTransOut, updateUnspent } from '../services/transaction.service'
import { generateBlock } from '../services/miner.service'

@Module({ namespaced: true, name: "ledger"})
class Ledger extends VuexModule {
    
    public blockchain: Block[] = [];
    public unspentTransactions: UnspentTransOut[] = [];

    get currentBalance(): number {
        const ownAddress = this.context.rootState.Wallet.publicKey;

        return this.unspentTransactions
        .filter((unspent) => unspent.address === ownAddress)
        .map((unspent) => unspent.amount)
        .reduce((a,b) => a+b, 0);
    }

    @Mutation
    public addBlock(params: {block: Block}) {
        //validate and do cool stuff here

        //add block to our own blockchain
        this.blockchain.push(params.block);

        //read transaction and update our own unspentTransactions
        const parsedTransaction: Transaction[] = JSON.parse(params.block.data);
        // console.log(parsedTransaction);

        this.unspentTransactions = updateUnspent(parsedTransaction,this.unspentTransactions);
    }

}
export default Ledger
