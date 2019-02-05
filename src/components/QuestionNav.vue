<template>
  <div class="questionnav">
    <ul>
      <li v-for="(q,index) in qdata" :key="index">
        <router-link :to="'/skip/'+index">
          {{ 'Q'+(index+1) }}
        </router-link>
        {{ q.score }} / {{ q.possible }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'QuestionNav',
  computed: {
    qdata () {
      return this.$store.state.assessInfo.questions
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
