<template>
  <div class="assess-header headerpane">
    <div style="flex-grow: 1">
      <h1>{{ ainfo.name }}</h1>
      <div>
        <span>{{ curScorePoints }}</span>
        <span class="answeredinfo">{{ curAnswered }}</span>
      </div>
    </div>

    <timer v-if="ainfo.timelimit > 0"
      :total="ainfo.timelimit"
      :end="ainfo.timelimit_expires">
    </timer>

    <button
      :class="{primary: ainfo.submitby === 'by_assessment' }"
      @click="handleSubmit"
      :disabled = "!canSubmit"
    >
      {{ assessSubmitLabel }}
    </button>

    <menu-button
      v-if="ainfo.resources.length > 0"
      id="resource-dropdown" position="right"
      :header = "$t('header.resources_header')"
      nobutton = "true"
      noarrow = "true"
      :options = "ainfo.resources"
      searchby = "title"
    >
      <template v-slot:button>
        <icons name="file" size="medium"/>
      </template>
    </menu-button>

    <div>
      <icons name="print" size="medium"/>
    </div>
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue';
import MenuButton from '@/components/MenuButton.vue';
import Icons from '@/components/Icons.vue';
import { store, actions } from '../basicstore';

export default {
  name: 'AssessHeader',
  components: {
    Timer,
    MenuButton,
    Icons
  },
  data: function () {
    return {
      resourceMenuShowing: false
    };
  },
  computed: {
    ainfo () {
      return store.assessInfo;
    },
    canSubmit () {
      return (!store.inTransit);
    },
    curScorePoints () {
      let pointsPossible = 0;
      let pointsEarned = 0;
      for (let i in this.ainfo.questions) {
        pointsPossible += this.ainfo.questions[i].points_possible * 1;
        if (this.ainfo.show_scores_during) {
          if (this.ainfo.questions[i].hasOwnProperty('gbscore')) {
            pointsEarned += this.ainfo.questions[i].gbscore * 1;
          }
        }
      }
      if (this.ainfo.show_scores_during) {
        return this.$t('header.score', { pts: pointsEarned, poss: pointsPossible });
      } else {
        return this.$t('header.possible', { poss: pointsPossible });
      }
    },
    curAnswered () {
      let qAnswered = 0;
      let nQuestions = this.ainfo.questions.length;
      for (let i in this.ainfo.questions) {
        if (this.ainfo.questions[i].try > 0) {
          qAnswered++;
        }
      }
      return this.$t('header.answered', { n: qAnswered, tot: nQuestions });
    },
    assessSubmitLabel () {
      if (this.ainfo.submitby === 'by_assessment') {
        return this.$t('header.assess_submit');
      } else {
        return this.$t('header.done');
      }
    }
  },
  methods: {
    handleSubmit () {
      if (this.ainfo.submitby === 'by_assessment') {
        if (this.ainfo.showscores === 'during') {
          // TODO: check for dirty questions and submit them
          actions.submitQuestion(-1, false, true);
        } else {
          // submit them all
          var qns = [];
          for (let k=0; k < this.ainfo.questions.length; k++) {
            qns.push(k);
          }
          actions.submitQuestion(qns, false, true);
        }
      } else {
        actions.submitQuestion(-1, false, true);
      }
    }
  }
};
</script>

<style>
.assess-header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
}
.assess-header > * {
  margin-right: 10px;
}
.assess-header h1 {
  margin: .4em 0 .2em;
}
.answeredinfo {
  color: #666666;
  margin-left: 20px;
}
.bigicon {
  font-size: 130%;
}
</style>
