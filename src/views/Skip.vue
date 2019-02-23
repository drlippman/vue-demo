<template>
  <div class="home">
    <assess-header></assess-header>
    <skip-question-header :qn="qn"/>
    <div class="scrollpane">
      <div class="questionpane">
        <question
          v-for="curqn in questionArray"
          :qn="curqn"
          :active="curqn == qn"
          :key="curqn"
          :class="{inactive: curqn != qn}"
        ></question>
      </div>
    </div>
  </div>
</template>

<script>
import AssessHeader from '@/components/AssessHeader.vue'
import SkipQuestionHeader from '@/components/SkipQuestionHeader.vue'
import Question from '@/components/Question.vue'

export default {
  name: 'skip',
  components: {
    SkipQuestionHeader,
    Question,
    AssessHeader
  },
  computed: {
    qn () {
      return parseInt(this.$route.params.qn)-1
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
.questionpane {
  margin: 15px 15px;
  width: 700px;
  overflow: visible;
}
.scrollpane {
  width: 100%;
  overflow-x: auto;
}
</style>
