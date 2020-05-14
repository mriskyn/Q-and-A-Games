import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
import io from 'socket.io-client';
const serverUrl='http://localhost:3000'
const socket =io(serverUrl)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    inputName(context,payload){
      socket.emit('input-name',payload)
    },
    transferName(){

    }
  },
  modules: {
  },
});
