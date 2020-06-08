import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

import { Block } from "../services/block.service";
import { Transaction, UnspentTransOut } from '../services/transaction.service'
import { generateBlock } from '../services/miner.service'

@Module({ namespaced: true, name: "ledger"})
class Ledger extends VuexModule {
    
    public blockchain: Block[] = [];
    public unspentTransactions: UnspentTransOut[] = [];

    public getCurrentBalance() {
        const ownAddress = this.context.rootState.wallet.publicKey;

        return this.unspentTransactions
        .filter((unspent) => unspent.address === ownAddress)
        .map((unspent) => unspent.amount)
        .reduce((a,b) => a+b, 0);
    }

    @Mutation
    public addBlock(params: {block: Block}) {
        //validate and do cool stuff here
        this.blockchain.push(params.block);
    }

}
export default Ledger
