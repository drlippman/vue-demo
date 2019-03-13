<template>
  <div class="home">
    <summary-header class="headerpane" />
    <div class="flexpanes">
      <div>
        <p v-if="showTotal">
          <span class="larger">
            {{ $t("summary.score") }}:
            {{ scoreTotalPercent }}%
          </span>
          <br/>
          {{ $t("summary.scorepts", {pts: scoreTotal, poss: ainfo.points_possible}) }}
          <span v-if="retakePenalty > 0">
            <br/>
            {{ $t("summary.retake_penalty", {n: retakePenalty}) }}
            <!-- TODO: late work penalty -->
          </span>
        </p>
        <p v-else>
          {{ $t("summary.no_total") }}
          {{ $t("summary.viewwork_" + ainfo.viewingb) }}
        </p>

        <div
          v-if="ainfo.hasOwnProperty('endmsg') && ainfo.endmsg != ''"
          v-html = "ainfo.endmsg"
        />

        <summary-score-list v-if="showScores" />

        <summary-categories v-if="hasCategories" />
      </div>

      <previous-attempts
        v-if="ainfo.hasOwnProperty('prev_attempts') && ainfo.prev_attempts.length > 0"
      />
    </div>
  </div>
</template>

<script>
import { store, actions } from '../basicstore';
import SummaryScoreList from '@/components/SummaryScoreList.vue';
import SummaryCategories from '@/components/SummaryCategories.vue';

export default {
  name: 'Summary',
  components: {
    SummaryScoreList,
    SummaryCategories
  },
  computed: {
    ainfo () {
      return store.assessInfo;
    },
    showTotal () {
      return (this.ainfo.showscores !== 'none');
    },
    showScores () {
      return (this.ainfo.showscores === 'during' || this.ainfo.showscores === 'at_end');
    }
    scoreTotal () {
      if (this.ainfo.hasOwnProperty('score')) {
        return this.ainfo.score;
      } else {
        let score = 0;
        for (let i in this.ainfo.questions) {
          score += this.ainfo.questions[i].score;
        }
        return score;
      }
    },
    retakePenalty () {
      if (this.ainfo.submitby === 'by_question') {
        return 0;
      }
      let curAttempt = this.ainfo.prev_attempts.length+1;
      if (curAttempt > this.ainfo.retake_penalty.n) {
        return this.ainfo.retake_penalty.penalty*(curAttempt - this.ainfo.retake_penalty.n);
      }
      return 0;
    },
    scoreTotalPercent () {
      return Math.round(1000*this.scoreTotal / this.ainfo.points_possible)/10;
    },
    hasCategories () {
      let hascat = false;
      for (let i in this.ainfo.questions) {
        if (this.ainfo.questions[i].hasOwnProperty('category') &&
          this.ainfo.questions[i].category !== ''
        ) {
          hascat = true;
          break;
        }
      }
      return hascat;
    }
  }
}
</script>

<style>
.flexpanes {
  display: flex;
  flex-flow: row;
}
.flexpanes div + div{
  border-left: 1px solid #ddd;
}
</style>
