import Vue from 'vue'
import Vuex from 'vuex'
import book from "./modules/book";
import getters from './getters'
import actions from "./actions";
  Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    book,
  },
  getters,
  actions

})
//如果调用vuex的参数 使用： this.$store.dispatch()  or
//                       this.$store.dispatch().then(() =>{} )