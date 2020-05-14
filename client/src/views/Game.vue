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
      score: 0,
      page: 1,
    };
  },
  methods: {
    checkAnswer(answer, key) {
      if (answer === key) {
        this.score += 1;
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
