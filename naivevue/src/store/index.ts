import Vue from "vue";
import Vuex from "vuex";

import Ledger  from './ledger.module'

Vue.use(Vuex);

export default new Vuex.Store({
  
  modules: {
    Ledger
  }
  
});
