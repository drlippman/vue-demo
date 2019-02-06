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
input[type=text] {
  height: 20px;
}
.haseqneditor {
  margin-right: 0;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 20px;
}
.eqneditortrigger {
  margin: 0;
  border-left: 0;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  height: 30px;
  padding: 4px;
  vertical-align: bottom;
}
input.green {
  margin-left: 0;
  border-color: #090;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
input.red {
  margin-left: 0;
  border-color: #900;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
.scoremark {
  display: inline-block;
  height: 20px;
  padding: 4px;
  margin-right: 0;
  border: 1px solid;
  border-right: 0;
  border-radius: 4px 0 0 4px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  height: 20px;
}
.scoremark.red {
  border-color: #900;
  color: #900;
}
.scoremark.green {
  border-color: #090;
  color: #090;
}
</style>
