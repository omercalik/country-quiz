<template>
  <h1 class="header">COUNTRY QUIZ</h1>
  <div class="container">
    <img
      v-if="!isGameEnded"
      class="adventurer"
      src="../assets/adventure.svg"
      alt=""
    />
    <img
      v-if="(currentQuestion.type = 'flag')"
      class="question-image"
      :src="currentQuestion.image"
    />
    <p v-if="!isGameEnded" class="question">{{ currentQuestion.question }}</p>
    <div v-if="isGameEnded">
      <img class="winner-image" src="../assets/winners.svg" alt="" />
      <p class="result-header">Results</p>
      <p class="result-text">
        You got
        <span>{{ correctAnswerCount }}</span> correct answers.
      </p>
      <button @click="restartGame" class="try-again-btn">
        Try Again
      </button>
    </div>
    <div v-else ref="choicecontainer">
      <Choice
        v-for="answ in currentQuestion.answers"
        :key="answ.index"
        :question="answ"
        @click="(answ) => checkAnswer(answ)"
      />
    </div>

    <button @click="changeQuestion" v-if="isAnswered">
      Next
    </button>
  </div>
</template>

<script lang="ts">
import Choice from "./Choice.vue"
import axios from "axios"
import { defineComponent } from "vue"
import { shuffle } from "../helpers/shuffle"
import { questionMaker } from "../helpers/questionMaker"

export default defineComponent({
  name: "GameContainer",
  components: {
    Choice,
  },
  data() {
    return {
      countries: [] as any,
      questions: [] as any,
      currentQuestion: {} as any,
      isGameEnded: false,
      isAnswered: false,
      correctAnswerCount: 0,
    }
  },

  mounted() {
    this.generateQuestions()
  },

  methods: {
    generateQuestions() {
      axios.get("https://restcountries.eu/rest/v2/all").then((res) => {
        let allCountries: any[]
        let wrongCountries: any[]
        allCountries = shuffle(res.data)

        this.countries = allCountries.splice(0, 10)
        wrongCountries = allCountries.splice(20, 20)

        this.questions = questionMaker(this.countries, wrongCountries)
        this.currentQuestion = this.questions[0]
        console.log(this.questions)
      })
    },

    restartGame() {
      this.isGameEnded = false
      this.correctAnswerCount = 0
      this.generateQuestions()
    },

    checkAnswer(e: Event) {
      this.isAnswered = !this.isAnswered
      let element = e.target as HTMLDivElement
      let value = element.innerHTML

      if (value === this.currentQuestion.answer) {
        element.classList.add("correct")
        this.correctAnswerCount += 1
      } else {
        element.classList.add("false")
        let divs = element.parentNode?.children
        if (divs) {
          for (let i = 0; i < divs.length; i++) {
            if (divs[i].textContent === this.currentQuestion.answer) {
              divs[i].classList.add("correct")
            }
          }
        }
      }
    },

    changeQuestion() {
      this.isAnswered = false
      let currentIndex = this.questions.findIndex(
        (x: any) => x.answer === this.currentQuestion.answer
      )

      if (currentIndex === 9) {
        this.isGameEnded = true
        this.endGame()
      } else {
        //@ts-ignore
        let choices = this.$refs.choicecontainer.children

        for (let i = 0; i < choices.length; i++) {
          choices[i].classList.remove("false")
          choices[i].classList.remove("correct")
        }

        this.currentQuestion = this.questions[currentIndex + 1]
      }
    },

    endGame() {
      console.log("game Ended")
    },
  },
})
</script>

<style lang="scss">
.container {
  border-radius: 24px;
  background-color: #fff;
  width: 100%;
  max-width: 460px;
  padding-bottom: 70px;
  margin: 0 auto;
  margin-top: 7%;

  @media screen and (max-width: 460px) {
    width: 90%;
    margin-right: 20px;
  }
}

.question {
  font-weight: 700;
  font-size: 24px;
  color: #2f527b;
  margin-bottom: 32px;
  margin-left: 32px;

  @media screen and (max-width: 460px) {
    font-size: 20px;
  }
}

.adventurer {
  position: relative;
  top: -70px;
  left: 65%;

  @media screen and (max-width: 710px) {
    //do Smth
    top: -50px;
  }

  @media screen and (max-width: 460px) {
    top: -30px;
  }
}

h1 {
  color: white;
  font-weight: 700;
  text-align: center;
}

.question-image {
  width: 85px;
  margin-left: -130px;
}

.winner-image {
  margin-left: 110px;
}

.result-header {
  font-weight: 700;
  font-size: 48px;
  color: #1d355d;
  text-align: center;
}

.result-text {
  font-weight: 400;
  text-align: center;
  color: #1d355d;
  font-size: 18px;

  span {
    color: green;
    font-weight: 700;
    font-size: 36px;
  }
}
.try-again-btn {
  display: block;
  width: 200px;
  margin: 0 auto;
  border: 2px solid #1d355d;
  border-radius: 12px;
  padding: 18px 60px;
  color: #1d355d;
  background: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #f9a826;
    color: white;
    transition: all 0.3s;
  }
}
</style>
