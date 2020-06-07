<template>
  <div class="hello">
    
    <el-button type="primary" @click="increment">{{ blockchain.length }}</el-button>
    <p v-text="JSON.stringify(blockchain)"></p>
  </div>
</template>

<script lang="ts">
import { Block } from '@/services/block.service'
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class'
import { Socket } from 'vue-socket.io-extended'
import { MSG_TYPE } from '@/services/socket.service'

const ledger = namespace('Ledger')

@Component
export default class HelloWorld extends Vue {

  //move this to store later or sm
  addresses: string[] = [] //all other clients connected to network

  increment() { 
    this.addBlock({
      index: 0,
      hash: 'asdadas',
      previousHash: 'asdsad',
      timeStamp: 12,
      data: 'data',
      difficulty: 5,
      proof: 2
    }); 
  }

  @ledger.State
  public blockchain!: Block[]

  @ledger.Mutation
  public addBlock!: (newBlock: Block) => void

  @Socket()
  connect() {
    this.$socket.client.emit(MSG_TYPE.JOINED, {address: 'adasdasdasd'});
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
