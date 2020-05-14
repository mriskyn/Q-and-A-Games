import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

Vue.use(Vuex);
const serverUrl = 'http://localhost:3000';
const socket = io(serverUrl);

export default new Vuex.Store({
  state: {
    user: [],
  },
  mutations: {
    addUser(state, payload) {
      console.log(payload, 'FROM mutation');
      state.user.push(payload);
    },
  },
  actions: {
    inputName(context, payload) {
      console.log(payload, 'FROM actions');
      context.commit('addUser', payload);
      socket.emit('input-name', payload);
    },
    transferName() {

    },
  },
  modules: {
  },
});
