<template>
  <table class="scorelist">
    <tr>
      <th>{{ $t('scorelist.question') }}</th>
      <th>{{ $t('scorelist.score') }}</th>
    </tr>
    <tr v-for="(question,index) in questions" :key="index">
      <td>
        <icons :name="question.status" />
        {{ $t('question_n', {n: index+1}) }}
      </td>
      <td v-if="question.try === 0">
        {{ $t('scorelist.unattempted') }}
      </td>
      <td v-else>
        {{ $tc('scorelist.pts', question.points_possible,
              {pts: question.gbscore, poss: question.points_possible}) }}
        <!-- TODO: display penalty note? -->
      </td>
    </tr>
  </table>
</template>

<script>
import { store } from '../../basicstore';
import Icons from '@/components/Icons.vue';

export default {
  name: 'SummaryScoreList',
  components: {
    Icons
  },
  computed: {
    questions () {
      return store.assessInfo.questions;
    }
  }
}
</script>

<style>
.scorelist {
  border-collapse: collapse;
}
.scorelist td, .scorelist th {
  padding: 8px 12px;
}
.scorelist td {
  border-bottom: 1px solid #ddd;
}
.scorelist th {
  text-align: left;
  border-bottom: 2px solid #ddd;
}
</style>
