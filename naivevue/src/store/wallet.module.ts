import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { generatePrivateKey, generatePublicKey } from '@/services/key.service'

//check to see if public/private key exists,
//otherwise generate one


@Module({ namespaced: true, name: "Wallet"})
class Wallet extends VuexModule{

    public privateKey: string = generatePrivateKey();
    public publicKey: string = generatePublicKey(this.privateKey);

}
export default Wallet;