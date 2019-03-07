<template>
  <div class="dropdown">
   <div
      tabindex=0
      role=button
      aria-haspopup=true
      aria-expanded=false
      aria-controls="qdetails-menu"
      class="dropdown-toggle"
      data-toggle="dropdown"
    >
      <i class="fa fa-info-circle bigicon"></i>
      Details
    </div>
    <div id="qdetails-menu" role="menu" class="dropdown-menu dropdown-menu-right">
      <p class="menu-header"><strong>Question Details</strong></p>

      <table class="qdetails" v-if="hasParts">
        <thead>
          <tr>
            <th>Part</th>
            <th v-if="showScore">Score</th>
            <th>Attempt</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(part,index) in qInfo.parts">
            <td>{{ index + 1 }}</td>
            <td v-if="showScore">{{ part.score }}/{{ part.possible }}</td>
            <td>{{ part.attempt }}/{{ part.totattempts }}</td>
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
import { store, actions } from '../basicstore';

export default {
  name: 'QuestionDetailsMenu',
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
#qdetails-menu {
  padding: 10px 15px;
}
.menu-header {
  border-bottom: 1px solid #ccc;
  margin: 0 -15px;
  padding: 5px 15px 15px;
}
table.qdetails {
  border-collapse: collapse;
  margin-bottom: 15px;
  margin-top: 10px;
}
table.qdetails tr {
  border-bottom: 1px solid #ccc;
}
table.qdetails td, table.qdetails th {
  padding: 4px 8px;
}
</style>
