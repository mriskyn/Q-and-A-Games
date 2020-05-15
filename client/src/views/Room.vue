<template>
  <div>
    <div>
      <div>
        <h2 class="font-weight-bold">Waiting Room</h2>
        <div class="row">
          <div
            class="card col-md-6"
            style="width: 18rem;"
            v-for="(member,index) in members"
            :key="index"
            :member="member"
          >
            <div class="card-body">
              <h5 class="card-title">Hello , {{member.name}} Welcome to Game!!!</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- <div>
          <div class="form-group">
              <label for="exampleInputEmail1">Create your Room</label>
              <input
                type="text"
                class="form-control"
                v-model='room'
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              >
          </div>
          <button @click="createRoom" type="submit" class="btn btn-primary">Create</button>
      </div>

      <div>
        <div class="row">
          <div
            class="card col-6"
            style="width: 18rem;"
            v-for="(server,index) in rooms"
            :key="index"
            :server="server"
          >
              <div class="card-body">
                  <h5 class="card-title">{{server}}</h5>
                  <button class="btn btn-primary">Join</button>
              </div>
          </div>
        </div>
    </div>-->

    <!-- <iframe
        src="../assets/bensound.mp3"
        allow="autoplay"
        id="audio"
        style="display: none">
        </iframe>
    <audio id="audio" controls loop hidden allow="autoplay" autoplay="autoplay">
      <source src="../assets/bensound.mp3" type="audio/mp3">
    </audio>-->

    <div v-if="members.length > 1">
      <button @click="buttonStart" class="btn btn-outline-primary mt-3">Start Game</button>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';

const serverUrl = 'http://localhost:3000';
const socket = io(serverUrl);

export default {
  data() {
    return {
      members: [],
      room: '',
      rooms: [],
    };
  },
  methods: {
    createRoom() {
      socket.emit('input-room', this.room);
    },
    buttonStart() {
      this.$store.dispatch('startGame', true);
      // socket.emit('start', true);
    },
  },
  created() {
    socket.on('play', (data) => {
      if (data) {
        this.$router.push('/game');
      }
    });

    socket.on('transfer-room', (data) => {
      this.rooms = data;
    });
    socket.on('transfer-name', (data) => {
      this.members = data;
    });
  },
};
</script>

<style scoped>

</style>
