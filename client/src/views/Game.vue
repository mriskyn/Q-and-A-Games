<template>
    <div class="jumbotron">
        <div v-if='score < 3 && !this.$store.state.foundWinner'>
            <p>{{ questions[index].quest }}</p>
            <form @submit.prevent="submitAnswer">
                <input type="text" v-model="answer">
                <button type="submit">Submit</button>
            </form>
        </div>

        <div v-if="this.$store.state.foundWinner">
            <!-- <h1>{{message}}</h1> -->
            <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#staticBackdrop"
          >
            See The Winner!
          </button>

          <div
            class="modal fade"
            id="staticBackdrop"
            data-backdrop="static"
            data-keyboard="false"
            tabindex="-1"
            role="dialog"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  {{ message }}
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
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
      answer: '',
      message: '',
    };
  },
  methods: {
    submitAnswer() {
      if (this.answer === this.questions[this.index].answer) {
        this.score += 1;
        this.index += 1;
        this.answer = '';
      }

      if (this.score === 3) {
        this.$store.dispatch('Winner');
        this.message = `${this.$store.state.name} is Winner`;
        socket.emit('winner', this.message);
      }
    },
  },
  created() {
    console.log(this.$store.state);
    socket.on('Winner', (data) => {
      this.$store.dispatch('Winner');
      this.message = data;
      console.log(this.$store.state.foundWinner);
    });
  },
};
</script>

<style scoped>
.row {
  justify-content: center
}
.answer {
  text-align: center;
  border: 1px solid black;
  margin: 1px;
}

.answer:hover{
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
    transform: scale(1.02);
    cursor: pointer;
}
</style>
