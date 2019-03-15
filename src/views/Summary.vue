<template>
  <div class="home">
    <summary-header class="headerpane" />
    <div class="flexpanes">
      <div style="flex-grow: 1">
        <summary-score-total />

        <div
          v-if="ainfo.hasOwnProperty('endmsg') && ainfo.endmsg != ''"
          v-html = "ainfo.endmsg"
        />

        <summary-score-list v-if="showScores" />

        <p>&nbsp;</p>
        
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
import SummaryHeader from '@/components/summary/SummaryHeader.vue';
import SummaryScoreTotal from '@/components/summary/SummaryScoreTotal.vue';
import SummaryScoreList from '@/components/summary/SummaryScoreList.vue';
import SummaryCategories from '@/components/summary/SummaryCategories.vue';
import PreviousAttempts from '@/components/PreviousAttempts.vue';

export default {
  name: 'Summary',
  components: {
    SummaryHeader,
    SummaryScoreTotal,
    SummaryScoreList,
    SummaryCategories,
    PreviousAttempts
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
  flex-flow: row wrap;
}
.flexpanes > div + div{
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  margin-top: -1px;
}
</style>
