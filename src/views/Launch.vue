<template>
  <div class="home">
    <p>{{ assessInfo.intro }}</p>
    <p>{{ totalPointsPossible }}</p>
    <p><button @click="startAssess">Begin</button></p>
  </div>
</template>

<script>

export default {
  name: 'launch',
  computed: {
    assessInfo () {
      return this.$store.state.assessInfo
    },
    totalPointsPossible () {
      return 'Assessment is worth ' + this.assessInfo.totalPointsPossible + ' points'
    }
  },
  methods: {
    startAssess () {
      this.$router.push('/skip/1')
    }
  }
}
</script>
