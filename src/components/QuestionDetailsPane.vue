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
            <td>{{ index + 1 }}</td>
            <td v-if="showScore">{{ part.score }}/{{ part.possible }}</td>
            <td>{{ part.try }}/{{ part.tries_max }}</td>
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

export default {
  name: 'QuestionDetailPane',
  props: ['qn'],
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
      return this.qInfo.hasOwnProperty('category');
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
