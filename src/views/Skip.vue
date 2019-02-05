<template>
  <div class="home">
    <question-nav />

    <h3>Question {{ qn+1 }}</h3>

    <question
      v-for="curqn in questionArray"
      :qn="curqn"
      :active="curqn == qn"
      :key="curqn"
      :class="{inactive: curqn != qn}"
    ></question>
  </div>
</template>

<script>
import QuestionNav from '@/components/QuestionNav.vue'
import Question from '@/components/Question.vue'

export default {
  name: 'skip',
  components: {
    QuestionNav,
    Question
  },
  computed: {
    qn () {
      return parseInt(this.$route.params.qn)
    },
    questionArray () {
      let qnArray = {}
      for (let i = 0; i < this.$store.state.assessInfo.questions.length; i++) {
        qnArray[i] = i
      }
      return qnArray
    }
  }
}
</script>

<style>
.inactive {
  visibility: hidden;
  position: absolute;
}
</style>
