<template>
  <div class = "questionwrap">
    <div v-if = "!questionContentLoaded">
      {{ $t('loading') }}
    </div>
    <score-result
      v-if = "showScore"
      :qdata = "questionData"
      :qn = "qn"
    />
    <div
      v-if = "questionContentLoaded"
      v-html="questionData.html"
      class = "question"
      :id="'questionwrap' + qn"
    />
    <question-helps :qn = "qn" />
    <div v-if="showSubmit" class="submitbtnwrap">
      <button
        type = "button"
        @click = "submitQuestion"
        class = "primary"
        :disabled = "!canSubmit"
      >
        {{ submitLabel }}
      </button>
    </div>
  </div>
</template>

<script>
import { store, actions } from '../basicstore';
import ScoreResult from '@/components/ScoreResult.vue';
import QuestionHelps from '@/components/QuestionHelps.vue';

export default {
  name: 'Question',
  props: ['qn', 'active'],
  components: {
    ScoreResult,
    QuestionHelps
  },
  data: function () {
    return {
        timeActivated: null,
        timeActive: 0
    }
  },
  computed: {
    questionData () {
      return store.assessInfo.questions[this.qn];
    },
    canSubmit () {
      return (!store.inTransit);
    },
    questionContentLoaded () {
      return (this.questionData.html !== null);
    },
    showSubmit () {
      return (this.questionContentLoaded &&
        this.questionData.canretry && (
        store.assessInfo.submitby === 'by_question' ||
          this.questionData.tries_max > 1
      )
      );
    },
    showScore () {
      return this.questionData.hasOwnProperty('score') && this.questionData.status !== 'unattempted';
    },
    submitLabel () {
      if (store.assessInfo.submitby === 'by_question') {
        // by question submission
        return this.$t('question.submit');
      } else if (this.questionData.tries_max === 1) {
        // by assessment, with one try
        return this.$t('question.saveans');
      } else {
        // by assessment, can retry
        return this.$t('question.checkans');
      }
    }
  },
  methods: {
    loadQuestionIfNeeded () {
      if (!this.questionContentLoaded && this.active && store.errorMsg===null) {
        actions.loadQuestion(this.qn, false);
      }
    },
    submitQuestion () {
      actions.submitQuestion(this.qn, false, false, this.timeActive);
    },
    updateTime (goingActive) {
      if (this.timeActivated === null || goingActive) {
        this.timeActivated = new Date();
      } else if (this.timeActivated !== null) {
        let now = new Date();
        this.timeActive += (now - this.timeActivated);
      }
    },
    addDirtyTrackers () {
      window.$('#questionwrap' + this.qn).find('input,select,textarea')
      .on('focus', function() {
        window.$(this).attr('data-lastval', window.$(this).val());
      })
      .on('change', function() {
        let val = window.$(this).val();
        if (val != window.$(this).attr('data-lastval')) {
          let name = window.$(this).attr("name");
          let m = name.match(/^(qs|qn|tc)(\d+)/);
          if (m !== null) {
            var qn = m[2]*1;
            if (qn>1000) {
              qn = Math.floor(qn/1000 + .001)-1;
            }
            if (store.assessFormIsDirty.indexOf(qn)==-1) {
              store.assessFormIsDirty.push(qn);
            }
          }
        }
      });
    },
    renderAndTrack () {
      setTimeout(window.drawPics, 100);
      window.rendermathnode(document.getElementById('questionwrap' + this.qn));
      this.updateTime(true);
      this.addDirtyTrackers();
    }
  },
  updated () {
    if (this.questionContentLoaded) {
      this.renderAndTrack();
    } else {
      this.loadQuestionIfNeeded();
    }
  },
  created () {
    this.loadQuestionIfNeeded();
    if (this.questionContentLoaded) {
      this.renderAndTrack();
    }
  },
  watch: {
    active: function (newVal, oldVal) {
      this.loadQuestionIfNeeded();
      this.updateTime(newVal);
    }
  }
};
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
.questionwrap .question {
  border: 0;
  background-color: #fff;
  margin: 12px 0;
}
.submitbtnwrap {
  margin: 16px 0;
}
</style>
