import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'

Vue.use(Vuex)
Vue.use(VueResource)

export default new Vuex.Store({
  state: {
    assessInfo: null
  },
  mutations: {
    setQuestionHtml (state, payload) {
      state.assessInfo.questions[payload.qn].html = payload.html
    },
    updateQuestionData (state, payload) {
      for (let key in payload) {
        state.assessInfo.questions[payload.qn][key] = payload[key]
      }
    }
  },
  actions: {
    loadQuestion (context, qn) {
      Vue.http.get('/data/getq' + qn + '.json')
        .then(response => {
          return response.json()
        }, error => {
          console.log(error)
        })
        .then(json => {
          context.commit('setQuestionHtml', json)
        })
    },
    submitQuestion (context, qn) {
      Vue.http.get('/data/scoreq' + qn + '.json')
        .then(response => {
          return response.json()
        }, error => {
          console.log(error)
        })
        .then(json => {
          context.commit('updateQuestionData', json)
        })
    }
  }
})
