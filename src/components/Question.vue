<template>
  <div class="question">
    <div v-if="!questionContentLoaded">
      Loading...
    </div>
    <div v-if="questionContentLoaded" v-html="questionData.html" :id="'questionwrap' + qn">
    </div>
    <div v-if="questionData.status == 0">
      <p><button @click="submitQuestion">Submit</button></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['qn'],
  computed: {
    questionData () {
      return this.$store.state.assessInfo.questions[this.qn]
    },
    questionContentLoaded () {
      return (this.questionData.html !== null)
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
      rendermathnode(document.getElementById("questionwrap" + this.qn));
    } else {
      this.loadQuestionIfNeeded();
    }
  },
  created () {
    this.loadQuestionIfNeeded();
  }
}
</script>