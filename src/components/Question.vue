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
    <div
      v-if = "questionContentLoaded"
      v-html="questionData.html"
      class = "question"
      :id="'questionwrap' + qn"
    />
    <div v-if="showSubmit">
      <p><br/>
        <button
          @click = "submitQuestion"
          class = "primary"
        >
          {{ submitLabel }}
        </button>
      </p>
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

export default {
  name: 'Question',
  props: ['qn', 'active'],
  components: {
    InterQuestionText
  },
  computed: {
    questionData () {
      return store.assessInfo.questions[this.qn];
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
    submitLabel () {
      if (store.assessInfo.submitby === 'by_question') {
        return this.$t('question.submit');
      } else {
        return this.$t('question.checkans'); ;
      }
    }
  },
  methods: {
    loadQuestionIfNeeded () {
      if (!this.questionContentLoaded && this.active) {
        actions.loadQuestion(this.qn);
      }
    },
    submitQuestion () {
      actions.submitQuestion(this.qn);
    }
  },
  updated () {
    if (this.questionContentLoaded) {
      setTimeout(window.drawPics, 100);
      window.rendermathnode(document.getElementById('questionwrap' + this.qn));
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
</style>
