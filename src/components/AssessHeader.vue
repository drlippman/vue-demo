<template>
  <div id="assess-header">
    <div style="flex-grow: 1">
      <h1>{{ ainfo.name }}</h1>
      <div>
        <span>{{ curScorePoints }}</span>
        <span class="answeredinfo">{{ curAnswered }}</span>
      </div>
    </div>

    <timer v-if="ainfo.timelimit > 0"
      :total="ainfo.timelimit"
      :end="ainfo.timeExpires">
    </timer>

    <button>{{ assessSubmitLabel }}</button>

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
        <i class="far fa-file-alt bigicon"></i>
      </template>
    </menu-button>

    <div>
      <i class="fas fa-print bigicon"></i>
    </div>
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue';
import MenuButton from '@/components/MenuButton.vue';
import { store } from '../basicstore';

export default {
  name: 'AssessHeader',
  components: {
    Timer,
    MenuButton
  },
  data: function () {
    return {
      resourceMenuShowing: false
    };
  },
  created () {
    // temporary for demo purposes
    if (store.assessInfo.timelimit > 0) {
      let now = new Date().getTime();
      store.assessInfo.timeExpires = now + 1000 * 60 * store.assessInfo.timelimit;
    }
  },
  computed: {
    ainfo () {
      return store.assessInfo;
    },
    curScorePoints () {
      let pointsPossible = 0;
      let pointsEarned = 0;
      for (let i in this.ainfo.questions) {
        pointsPossible += this.ainfo.questions[i].points_possible * 1;
        if (this.ainfo.show_scores_during) {
          pointsEarned += this.ainfo.questions[i].score * 1;
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
        if (this.ainfo.questions[i].status > 0) {
          qAnswered++;
        }
      }
      return this.$t('header.answered', { n: qAnswered, tot: nQuestions });
    },
    assessSubmitLabel () {
      return this.$t('header.assess_submit');
    }
  }
};
</script>

<style>
#assess-header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
#assess-header > * {
  margin-right: 10px;
}
#assess-header h1 {
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
