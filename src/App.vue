<template>
  <div id="app">
    <div id="header">
      <p>Page Header</p>
      <hr/>
    </div>
    <div v-if="!assessInfoLoaded">
      Loading...
    </div>
    <div v-if="assessInfoLoaded">
      <h1>{{ assessName }}</h1>
    </div>
    <router-view v-if="assessInfoLoaded"/>
  </div>
</template>

<script>

export default {
  computed: {
    assessInfoLoaded () {
      return (this.$store.state.assessInfo !== null)
    },
    assessName () {
      return this.$store.state.assessInfo.name
    }
  },
  created () {
    this.$http.get('/data/assessdata.json')
      .then(response => {
        return response.json()
      }, error => {
        console.log(error)
      })
      .then(json => {
        this.$store.state.assessInfo = json
      })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/*
<router-link to="/">Home</router-link> |
<router-link to="/about">About</router-link>
*/
</style>
