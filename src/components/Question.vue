<template>
  <div class = "questionwrap">
    <div v-if = "!questionContentLoaded">
      {{ $t('loading') }}
    </div>
    <inter-question-text
      v-if = "questionContentLoaded"
      v-for = "(textitem,index) in preText"
      :textobj = "textitem"
      :key = "index"
    />
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
    <inter-question-text
      v-if = "questionContentLoaded"
      v-for = "(textitem,index) in postText"
      :textobj = "textitem"
      :key = "index"
    />
  </div>
</template>

<script>
import { store, actions } from '../basicstore';
import InterQuestionText from '@/components/InterQuestionText.vue';
import ScoreResult from '@/components/ScoreResult.vue';
import QuestionHelps from '@/components/QuestionHelps.vue';

export default {
  name: 'Question',
  props: ['qn', 'active'],
  components: {
    InterQuestionText,
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
    preText () {
      let out = [];
      for (let  i in store.assessInfo.interquestion_text) {
        let textObj = store.assessInfo.interquestion_text[i];
        if (this.qn >= textObj.displayBefore && this.qn <= textObj.displayUntil) {
          out.push({
            html: textObj.text,
            expanded: (textObj.forntype === true || this.qn === textObj.displayBefore)
          });
        }
      }
      return out;
    },
    postText () {
      let out = [];
      if (this.qn === store.assessInfo.questions.length - 1) {
        // only show post text if last question
        for (let i in store.assessInfo.interquestion_text) {
          let textObj = store.assessInfo.interquestion_text[i];
          if (this.qn < textObj.displayBefore) {
            out.push({
              html: textObj.text,
              expanded: (textObj.forntype == 1 || this.qn == textObj.displayBefore)
            });
          }
        }
      }
      return out;
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
      } else if (this.questionData.try === this.questionData.tries_max - 1) {
        // by assessment, on last try
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
    }
  },
  updated () {
    if (this.questionContentLoaded) {
      setTimeout(window.drawPics, 100);
      window.rendermathnode(document.getElementById('questionwrap' + this.qn));
      this.updateTime(true);
      this.addDirtyTrackers();
    } else {
      this.loadQuestionIfNeeded();
    }
  },
  created () {
    this.loadQuestionIfNeeded();
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
}
.submitbtnwrap {
  margin: 16px 0;
}
</style>
