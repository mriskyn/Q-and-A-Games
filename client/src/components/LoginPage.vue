<template>
  <div class="jumbotron">
    <h1 class="display-4">Welcome to the Q & A Games!</h1>
    <div>
      <div class="form-group">
        <label for="exampleInputEmail1">Your Name</label>
        <input
          type="text"
          class="form-control"
          v-model="name"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <button @click="EnterRoom" type="submit" class="btn btn-primary">Submit</button>
    </div>
    <hr class="my-4" />
    <div>
      <div
        class="card"
        style="width: 18rem;"
        v-for="(name, index) in names"
        :key="index"
        :name="name"
      >
        <div class="card-body">
          <h5 class="card-title">{{name.name}}</h5>
          <p class="card-text">join the game</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// or with import syntax
import io from 'socket.io-client';

const serverUrl = 'http://localhost:3000';
const socket = io(serverUrl);

export default {
  name: 'LoginPage',
  data() {
    return {
      name: '',
      names: [],
    };
  },
  methods: {
    EnterRoom() {
      this.$store.dispatch('inputName', { name: this.name, skor: 0 });
      this.$store.dispatch('User', this.name);
      // socket.emit('input-name',this.name)
      this.$router.push({ name: 'Room' });
      this.name = '';
    },
  },
  created() {
    socket.on('transfer-name', (data) => {
      this.names = data;
    });
  },
};
</script>

<style scoped>
</style>
