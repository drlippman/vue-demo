<template>
  <div class="home">
    <h1>{{ aInfo.name }}</h1>
    <div v-html="aInfo.intro"></div>
    <p>{{ totalPointsPossibleString }}</p>
    <p><button @click="startAssess">Begin</button></p>
  </div>
</template>

<script>
import { store, actions } from "../basicstore";

export default {
  name: 'launch',
  computed: {
    aInfo () {
      return store.assessInfo
    },
    totalPointsPossible () {
      let pointsPossible = 0;
      for (let i in this.aInfo.questions) {
        pointsPossible += this.aInfo.questions[i].possible;
      }
      return pointsPossible
    },
    totalPointsPossibleString () {
      return 'Assessment is worth ' + this.totalPointsPossible + ' points'
    }
  },
  methods: {
    startAssess () {
      this.$router.push('/skip/1')
    }
  }
}
</script>
