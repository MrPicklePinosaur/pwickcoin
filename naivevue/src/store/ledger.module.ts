import { VuexModule, Module, Mutation } from "vuex-module-decorators";

import { Block } from "../services/block.service";
import { Transaction } from '../services/transaction.service'
import { generateBlock } from '../services/miner.service'

@Module({ namespaced: true, name: "ledger"})
class Ledger extends VuexModule {
    
    public length = 5;
    public blockchain: Block[] = [];

    @Mutation
    public addBlock(params: {transactions: Transaction[]}) {
        //validate and do cool stuff here
        const newBlock = generateBlock(params.transactions,this.blockchain);
        this.blockchain.push(newBlock);
    }

}
export default Ledger
