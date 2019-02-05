<template>
  <div class="home">
    <question-nav />

    <h3>Question {{ qn+1 }}</h3>

    <question :qn="qn"></question>
  </div>
</template>

<script>
// @ is an alias to /src
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
    }
  }
}
</script>
