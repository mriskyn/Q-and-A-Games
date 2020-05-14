<template>
    <div>
        <div v-if='score<3&&!this.$store.state.foundWinner'>
            <p>{{questions[index].quest}}</p>
            <form @submit.prevent="SubmitJawaban">
                <input type="text" v-model="jawaban">
                <button type="submit">Submit</button>
            </form>
        </div>

        <div v-if="this.$store.state.foundWinner">
            <h1>{{message}}</h1>
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
      questions: [
        {
          quest: 'warna apel??',
          answer: 'merah',
        },
        {
          quest: 'warna nanas??',
          answer: 'kuning',
        },
        {
          quest: 'warna rambut??',
          answer: 'hitam',
        },
      ],
      score: 0,
      index: 0,
      jawaban: '',
      message: '',
    };
  },
  methods: {
    SubmitJawaban() {
      if (this.jawaban === this.questions[this.index].answer) {
        this.score += 1;
        this.index += 1;
        this.jawaban = '';
      }

      if (this.score === 3) {
        this.$store.dispatch('Winner');
        this.message = `${this.$store.state.name} is Winner`;
        socket.emit('winner', this.message);
      }
    },
  },
  created() {
    socket.on('Winner', (data) => {
      this.$store.dispatch('Winner');
      this.message = data;
      console.log(this.$store.state.foundWinner);
    });
  },
};
</script>

<style>

</style>
