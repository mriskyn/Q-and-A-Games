<template>
    <div class="jumbotron">
        <!-- <div v-if='score < 3 && !this.$store.state.foundWinner'>
            <p>{{ questions[index].quest }}</p>
            <form @submit.prevent="submitAnswer">
                <input type="text" v-model="answer">
                <button type="submit">Submit</button>
            </form>
        </div> -->
        <div class="jumbotron jumbotron-fluid" v-show="!this.$store.state.foundWinner">
          <h4 class="display-5 text-center">QUIZ PAGE ({{page}})</h4>
          <div
            class="container"
            v-for="(data, index) in datas"
            :key="index"
            v-show="page === index + 1"
          >
            <h4 class="display-6 text-center" style="">{{ data.question }}</h4>
            <div class="row">
              <div
                class="answer col-md-4"
                v-for="(answer, key) in data.answers"
                :key="key"
                @click="checkAnswer(answer, data.key)"
              >
                {{ key }}. {{ answer }}
              </div>
            </div>
          </div>
        </div>

        <!-- <div v-if="this.$store.state.foundWinner"> -->
        <div v-show="page === 11">

          <button @click="back">Back to Home</button>

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
                  Your Scores {{ this.score }} / 10
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
        <div v-if="this.$store.state.foundWinner">
             <h1>{{message}}</h1>
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import axios from 'axios';

const serverUrl = 'http://localhost:3000';
const socket = io(serverUrl);

export default {
  name: 'Game',
  data() {
    return {
      // questions: [
      //   {
      //     quest: 'warna apel??',
      //     answer: 'merah',
      //   },
      //   {
      //     quest: 'warna nanas??',
      //     answer: 'kuning',
      //   },
      //   {
      //     quest: 'warna rambut??',
      //     answer: 'hitam',
      //   },
      // ],
      // index: 0,
      answer: '',
      message: '',
      datas: null,
      score: 0,
      page: 1,
    };
  },
  methods: {
    submitAnswer() {
      // if (this.answer === this.questions[this.index].answer) {
      //   this.score += 1;
      //   this.index += 1;
      //   this.answer = '';
      // }

      if (this.score === 11) {
        this.$store.dispatch('Winner');
        console.log(this.$store.state.name)
        this.message = `${this.$store.state.name} is Winner`;
        socket.emit('winner', this.message);
      }
    },
    checkAnswer(answer, key) {
      if (answer === key) {
        this.score += 1;
        this.next()
      }
      if (this.score === 10) {
        this.$store.dispatch('Winner');
        console.log(this.$store.state.name)
        this.message = `${this.$store.state.name} is Winner`;
        socket.emit('winner', this.message);
      }
    //   this.next();
    },
    next() {
      this.page += 1;
    },
    back(){
        this.$router.push('/')
        socket.emit('Home')
    }
  },
  created() {
    axios({
      url: 'http://localhost:3000/questions',
      method: 'GET',
    })
      .then((res) => {
        this.datas = res.data;
      })
      .catch((err) => {
        console.log(err);
      });

    socket.on('Winner', (data) => {
      this.$store.dispatch('Winner');
      this.message = data;
      console.log(this.$store.state.foundWinner);
    });

    socket.on('backhome',()=>{
        this.$router.push('/')
        this.score=0
    })
  },
};
</script>

<style scoped>
.row {
  justify-content: center;

}
.answer {
  text-align: center;
  border: 1px solid black;
  border-radius: 20px;
  margin: 2px;
}

.answer:hover{
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
    transform: scale(1.02);
    cursor: pointer;
}

.jumbotron {
  border-radius: 30px;
}
</style>
