<template>
  <div class="hello">
    
    <el-button type="primary" @click="increment">{{ length }}</el-button>

  </div>
</template>

<script lang="ts">
import { Block } from '../services/block.service'
import { Component, Prop, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class'

const ledger = namespace('Ledger')

@Component
export default class HelloWorld extends Vue {

  count = 0

  increment() { this.count++; }

  @ledger.State
  public length!: number


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
