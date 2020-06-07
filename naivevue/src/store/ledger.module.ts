import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators'

import { Block } from '../services/block.service'

@Module({ namespaced: true, name: 'ledger'})
class Ledger extends VuexModule {
    
    public blockchain: Block[] = []

    

}
export default Ledger
