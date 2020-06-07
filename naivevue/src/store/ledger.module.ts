import { VuexModule, Module, Mutation } from "vuex-module-decorators";

import { Block } from "../services/block.service";

@Module({ namespaced: true, name: "ledger"})
class Ledger extends VuexModule {
    
    public length = 5;
    public blockchain: Block[] = [];

    @Mutation
    public addBlock(newBlock: Block) {
        //validate and do cool stuff here

        this.blockchain.push(newBlock);
    }

}
export default Ledger
