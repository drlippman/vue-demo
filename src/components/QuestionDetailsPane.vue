<template>
  <div id="qdetails-pane">
    <div class="pane-header">
      Question Details
    </div>
    <div class="pane-body">
      <table class="qdetails" v-if="hasParts">
        <thead>
          <tr>
            <th>Part</th>
            <th v-if="showScore">Score</th>
            <th>Attempt</th>
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
          </tr>
        </tbody>
      </table>

      <p v-if="hasCategory">
        <strong>Category:</strong>
        {{ qInfo.category }}
      </p>
    </div>
  </div>
</template>

<script>
import { store } from '../basicstore';
import Icons from '@/components/Icons.vue';

export default {
  name: 'QuestionDetailPane',
  props: ['qn'],
  components: {
    Icons
  },
  computed: {
    qInfo () {
      return store.assessInfo.questions[this.qn];
    },
    showScore () {
      return this.qInfo.hasOwnProperty('score');
    },
    hasParts () {
      return this.qInfo.hasOwnProperty('parts');
    },
    hasCategory () {
      return (this.qInfo.hasOwnProperty('category') && this.qInfo.category != '');
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
