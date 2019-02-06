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
    setAssessData (state, payload) {
      state.assessInfo = payload;
    },
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
    loadAssessData (context) {
      Vue.http.get(process.env.BASE_URL + 'data/assessdata.json')
        .then(response => {
          return response.json()
        }, error => {
          console.log(error)
        })
        .then(json => {
          context.commit('setAssessData', json)
        })
    },
    loadQuestion (context, qn) {
      Vue.http.get(process.env.BASE_URL + 'data/getq' + qn + '.json')
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
      Vue.http.get(process.env.BASE_URL + 'data/scoreq' + qn + '.json')
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
