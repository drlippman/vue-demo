<template>
  <div class="questionwrap">
    <div v-if="!questionContentLoaded">
      Loading...
    </div>
    <div v-if="questionContentLoaded" v-html="questionData.html" :id="'questionwrap' + qn">
    </div>
    <div v-if="questionData.canreattempt">
      <p><br/><button @click="submitQuestion">{{ submitLabel }}</button></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
  props: ['qn', 'active'],
  computed: {
    questionData () {
      return this.$store.state.assessInfo.questions[this.qn]
    },
    questionContentLoaded () {
      return (this.questionData.html !== null)
    },
    questionCount () {
      return (this.$store.state.assessInfo.questions.length)
    },
    submitLabel () {
      return 'Check Answer'
    }
  },
  methods: {
    loadQuestionIfNeeded () {
      if (!this.questionContentLoaded && this.active) {
        this.$store.dispatch('loadQuestion', this.qn)
      }
    },
    submitQuestion () {
      this.$store.dispatch('submitQuestion', this.qn)
    }
  },
  updated () {
    if (this.questionContentLoaded) {
      setTimeout(drawPics, 100)
      rendermathnode(document.getElementById("questionwrap" + this.qn))
    } else {
      this.loadQuestionIfNeeded()
    }
  },
  created () {
    this.loadQuestionIfNeeded()
  },
  watch: {
    active: function (newVal, oldVal) {
      this.loadQuestionIfNeeded()
    }
  }
}
</script>
<style>
.haseqneditor {
  margin-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 20px;
}
.eqneditortrigger {
  margin-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 30px;
  padding: 4px;
}
</style>
