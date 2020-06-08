<template>
  <div class="hello">
    <p>Connected clients</p>
    <p>{{this.addresses}}</p>

    <el-button type="primary" @click="mine">MINE!</el-button>
    <p v-text="JSON.stringify(blockchain)"></p>

  </div>
</template>

<script lang="ts">
import { Block } from '@/services/block.service'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import { Socket } from 'vue-socket.io-extended'
import { MSG_TYPE } from '@/services/socket.service'
import { generateBlock } from '@/services/miner.service'
import { Transaction } from '@/services/transaction.service'

const ledger = namespace('Ledger')
const wallet = namespace('Wallet')

@Component
export default class HelloWorld extends Vue {

  //move this to store later or sm
  addresses: string[] = []; //all other clients connected to network

  mine() {
    const transaction: Transaction[] = [{hash:'',transInList:[],transOutList:[]}];
    const newBlock = generateBlock(transaction,this.blockchain);
    //this.addBlock({block: newBlock});

    //broadcast that we found a block
    this.$socket.client.emit(MSG_TYPE.NEW_BLOCK, {block: JSON.stringify(newBlock)});
  }

  @ledger.State
  public blockchain!: Block[];

  @wallet.State
  public publicKey!: string;

  @ledger.Mutation
  public addBlock!: (params: {block: Block}) => void

  @Socket()
  connect() {
    this.$socket.client.emit(MSG_TYPE.JOINED, {address: this.publicKey});
  }

  @Socket(MSG_TYPE.JOINED) //when we first establish connection, the server will give us a list of other clients
  onJoin(data: {connected: string[]}) {
    console.log(`Joined server with ${data.connected.length} connected clients`);
    this.addresses = data.connected;
  }

  @Socket(MSG_TYPE.OTHER_JOINED) //when someone else joins, we just add them to our list
  onOtherJoin(data: {new_address: string}) {
    console.log(`User with address ${data.new_address.substring(0,10)}... has joined`);
    this.addresses.push(data.new_address);
  }

  @Socket(MSG_TYPE.NEW_BLOCK)
  onNewBlock(data: {block: string}) {
    const newBlock: Block = JSON.parse(data.block);

    console.log(`new block has been found ${newBlock.hash}`);

    //do verification stuff here and stuffs

    //add it to our block chain
    this.addBlock({block: newBlock});

  }
}

</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
