<template>
  <div id="qdetails-pane">
    <div class="pane-header nowrap">
      {{ $t('qdetails.question_details') }}
    </div>
    <div class="pane-body">
      <table class="qdetails" v-if="hasParts">
        <thead>
          <tr>
            <th>{{ $t('qdetails.part') }}</th>
            <th v-if="showScore">{{ $t('qdetails.score') }}</th>
            <th>{{ $t('qdetails.try') }}</th>
            <th v-if="hasPenalty">{{ $t('qdetails.penalties') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(part,index) in qInfo.parts" :key="index">
            <td>
              <icons :name="partIcons[index]" />
              {{ index + 1 }}
            </td>
            <td v-if="showScore">{{ part.score }}/{{ part.points_possible }}</td>
            <td>{{ part.try }}/{{ qInfo.tries_max }}</td>
            <td v-if="hasPenalty">
              <penalties-applied
                :qn="qn"
                :part="index"
                v-if="partHasPenalties.indexOf(index) != -1"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <p v-if="hasCategory">
        <strong>{{ $t('qdetails.category') }}:</strong>
        {{ qInfo.category }}
      </p>
    </div>
  </div>
</template>

<script>
import { store } from '../basicstore';
import Icons from '@/components/Icons.vue';
import PenaltiesApplied from '@/components/PenaltiesApplied.vue';

export default {
  name: 'QuestionDetailPane',
  props: ['qn'],
  components: {
    Icons,
    PenaltiesApplied
  },
  computed: {
    qInfo () {
      return store.assessInfo.questions[this.qn];
    },
    showScore () {
      return this.qInfo.hasOwnProperty('score');
    },
    hasParts () {
      return (this.qInfo.hasOwnProperty('parts') &&
        this.qInfo.parts.length > 1 &&
        this.qInfo.parts[0].hasOwnProperty('points_possible')
      );
    },
    hasCategory () {
      return (this.qInfo.hasOwnProperty('category') && this.qInfo.category != '');
    },
    partHasPenalties () {
      let out = [];
      console.log(this.qInfo);
      for (let pn=0; pn<this.qInfo.parts.length; pn++) {
        if (this.qInfo.parts[pn].hasOwnProperty('penalties') &&
          this.qInfo.parts[pn].penalties.length > 0
        ) {
          out.push(pn);
        }
      }
      return out;
    },
    hasPenalty () {
      return this.partHasPenalties.length > 0;
    },
    partIcons () {
      let out = [];
      if (this.qInfo.hasOwnProperty('parts')) {
        for (let i=0; i < this.qInfo.parts.length; i++) {
          if (this.qInfo.parts[i].try == 0) {
            out[i] = 'unattempted';
          } else if (!this.qInfo.parts[i].hasOwnProperty('rawscore')) {
            out[i] = 'attempted';
          } else if (this.qInfo.parts[i].rawscore > .99) {
            out[i] = 'correct';
          } else if (this.qInfo.parts[i].rawscore < .01) {
            out[i] = 'incorrect';
          } else {
            out[i] = 'partial';
          }
        }
      }
      return out;
    }
  }
};
</script>
<style>
#qdetails-pane {
  padding: 0;
  margin: 0;
}
.pane-header {
  border-bottom: 1px solid #ccc;
  padding: 16px 20px;
  font-weight: bold;
}
.pane-body {
  padding: 16px 20px;
}
table.qdetails {
  border-collapse: collapse;
  margin-bottom: 20px;
}
table.qdetails tr {
  border-bottom: 1px solid #ccc;
}
table.qdetails td, table.qdetails th {
  padding: 4px 8px;
}
</style>
