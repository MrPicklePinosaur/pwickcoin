import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";

import { Block } from "../services/block.service";
import { Transaction } from '../services/transaction.service'
import { generateBlock } from '../services/miner.service'

@Module({ namespaced: true, name: "ledger"})
class Ledger extends VuexModule {
    
    public length = 5;
    public blockchain: Block[] = [];

    @Mutation
    public addBlock(params: {block: Block}) {
        //validate and do cool stuff here
        this.blockchain.push(params.block);
    }

}
export default Ledger
