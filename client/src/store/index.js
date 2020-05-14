import Vue from 'vue';
import Vuex from 'vuex';
import io from 'socket.io-client';

Vue.use(Vuex);
const serverUrl = 'http://localhost:3000';
const socket = io(serverUrl);

export default new Vuex.Store({
  state: {
    foundWinner: false,
    name: '',
  },
  mutations: {
    Winner(state) {
      state.foundWinner = true;
    },
    User(state, payload) {
      console.log(payload);
      state.name = payload;
    },
  },
  actions: {
    inputName(context, payload) {
      socket.emit('input-name', payload);
    },
    startGame(context, payload) {
      socket.emit('start', payload);
    },
    Winner(context) {
      context.commit('Winner');
    },
    User(context, payload) {
      context.commit('User', payload);
    },
  },
  modules: {
  },
});
