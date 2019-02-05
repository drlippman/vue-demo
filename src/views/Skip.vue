<template>
  <div class="home">
    <question-nav />

    <h3>Question {{ qn+1 }}</h3>

    <div v-if="!questionContentLoaded">
      Loading...
    </div>
    <div v-if="questionContentLoaded" v-html="questionData.html" id="questionwrap">
    </div>
    <div v-if="questionData.status == 0">
      <p><button @click="submitQuestion">Submit</button></p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionNav from '@/components/QuestionNav.vue'

export default {
  name: 'skip',
  components: {
    QuestionNav
  },
  computed: {
    qn () {
      return parseInt(this.$route.params.qn)
    },
    questionData () {
      return this.$store.state.assessInfo.questions[this.qn]
    },
    questionContentLoaded () {
      return (this.questionData.html !== null)
    }
  },
  created () {
    this.loadQuestionIfNeeded();
  },
  watch: {
    '$route.params.qn': function (qn) {
      this.loadQuestionIfNeeded()
    }
  },
  methods: {
    loadQuestionIfNeeded () {
      if (!this.questionContentLoaded) {
        this.$store.dispatch('loadQuestion', this.qn)
      }
    },
    submitQuestion () {
      this.$store.dispatch('submitQuestion', this.qn)
    }
  },
  updated () {
    if (this.questionContentLoaded) {
      setTimeout("drawPics()",100);
      rendermathnode(document.getElementById("questionwrap"));
    }
  }

}
</script>
