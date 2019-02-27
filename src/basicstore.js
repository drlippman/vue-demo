import Vue from 'vue'

export const store = Vue.observable({
  assessInfo: null,
  APIbase: null,
  aid: null,
  cid: null
})

export const actions = {
  loadAssessData () {
    window.$.ajax({
      url: store.APIbase + 'loadassess.php?cid='+store.cid+'&aid='+store.aid,
      dataType: 'json',
      xhrFields: {
           withCredentials: true
      },
      crossDomain: true
    })
    .done(response => {
      store.assessInfo = response;
    })
  },
  loadQuestion (qn) {
    window.$.ajax({
      url: store.APIbase + 'data/getq' + qn + '.json',
      dataType: 'json'
    })
    .done(response => {
      store.assessInfo.questions[qn].html = response.html
    })
  },
  submitQuestion (qn) {
      window.$.ajax({
        url: store.APIbase + 'data/scoreq' + qn + '.json',
        dataType: 'json'
      })
      .done(response => {
        for (let key in response) {
          store.assessInfo.questions[qn][key] = response[key]
        }
      })
  }
}
