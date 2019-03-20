<template>
  <div class="home">
    <assess-header></assess-header>
    <skip-question-header :qn="qn"/>
    <div class="scrollpane">
      <div
        class = "questionpane"
        v-if = "qn == -1"
        v-html = "intro"
      />
      <div class="questionpane">
        <div
          v-for="curqn in questionArray"
          :key="curqn"
          :class="{inactive: curqn != qn}"
        >
          <inter-question-text-list
            pos = "before"
            :qn = "curqn"
          />
          <question
            :qn="curqn"
            :active="curqn == qn"
          />
          <inter-question-text-list
            pos = "after"
            :qn = "curqn"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AssessHeader from '@/components/AssessHeader.vue';
import SkipQuestionHeader from '@/components/SkipQuestionHeader.vue';
import InterQuestionTextList from '@/components/InterQuestionTextList.vue';
import Question from '@/components/Question.vue';
import { store } from '../basicstore';

export default {
  name: 'skip',
  components: {
    SkipQuestionHeader,
    Question,
    InterQuestionTextList,
    AssessHeader
  },
  computed: {
    qn () {
      return parseInt(this.$route.params.qn) - 1;
    },
    intro () {
      return store.assessInfo.intro;
    },
    questionArray () {
      let qnArray = {};
      for (let i = 0; i < store.assessInfo.questions.length; i++) {
        qnArray[i] = i;
      }
      return qnArray;
    }
  }
};
</script>

<style>
.inactive {
  visibility: hidden;
  position: absolute;
}
.questionpane {
  margin: 15px 15px;
  max-width: 700px;
  overflow: visible;
}
.scrollpane {
  width: 100%;
  overflow-x: auto;
}
</style>
