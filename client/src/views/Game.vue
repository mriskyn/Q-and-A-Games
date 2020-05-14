<template>
  <div class="jumbotron jumbotron-fluid">
    <h4 class="display-5 text-center">QUIZ PAGE ({{page}})</h4>
    <div
      class="container"
      v-for="(data, index) in datas"
      :key="index"
      v-show="page === index + 1"
    >
      <h4 class="display-6 text-center">{{ data.question }}</h4>
      <div class="row">
        <div
          class="answer col-md-5"
          v-for="(answer, key) in data.answers"
          :key="key"
          @click="checkAnswer(answer, data.key)"
        >
          {{ key }}. {{ answer }}
        </div>
      </div>
      <button class="mt-2 btn-block" @click="next">Next</button>


      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#staticBackdrop"
      >
        Finish
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
              <h5 class="modal-title" id="staticBackdropLabel">Congratulation</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              You Got Score : 0
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Quiz',
  data() {
    return {
      datas: null,
      keys: null,
      page: 1,
    };
  },
  methods: {
    checkAnswer(answer, key) {
      if (answer === key) {
        console.log(this.$store.state.user);
        this.$store.state.user.score += 1;
      }
    },
    next() {
      this.page += 1;
    },
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
