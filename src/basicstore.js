import Vue from 'vue'

export const store = Vue.observable({
  assessInfo: null
})

export const actions = {
  loadAssessData (context) {
    window.$.ajax({
      url: process.env.BASE_URL + 'data/assessdata.json',
      dataType: 'json'
    })
    .done(response => {
      store.assessInfo = response;
    })
  },
  loadQuestion (qn) {
    window.$.ajax({
      url: process.env.BASE_URL + 'data/getq' + qn + '.json',
      dataType: 'json'
    })
    .done(response => {
      store.assessInfo.questions[qn].html = response.html
    })
  },
  submitQuestion (qn) {
      window.$.ajax({
        url: process.env.BASE_URL + 'data/scoreq' + qn + '.json',
        dataType: 'json'
      })
      .done(response => {
        for (let key in response) {
          store.assessInfo.questions[qn][key] = response[key]
        }
      })
  }
}
