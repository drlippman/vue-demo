import Vue from 'vue';

export const store = Vue.observable({
  assessInfo: null,
  APIbase: null,
  aid: null,
  cid: null
});

export const actions = {
  loadAssessData () {
    store.inTransit = true;
    window.$.ajax({
      url: store.APIbase + 'loadassess.php?cid=' + store.cid + '&aid=' + store.aid,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
      .done(response => {
        store.assessInfo = response;
      })
      .always(response => {
        store.inTransit = false;
      });
  },
  startAssess (password, new_group_members) {
    store.inTransit = true;
    window.$.ajax({
      url: store.APIbase + 'startassess.php?cid=' + store.cid + '&aid=' + store.aid,
      type: 'POST',
      dataType: 'json',
      data: {
        password: password,
        new_group_members: new_group_members.join(','),
        cur_group: store.assessInfo.stugroupid
      },
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
      .done(response => {
      // overwrite properties with those from response
        store.assessInfo = Object.assign({}, store.assessInfo, response);
        // route to correct display
        if (response.has_active_attempt) {
          let queryString = '?cid=' + store.cid + '&aid=' + store.aid;
          if (response.displaymethod == 'skip') {
            this.$router.history.push('/skip/0' + this.queryString);
          } else if (response.displaymethod == 'full') {
            this.$router.history.push('/full' + this.queryString);
          }
        }
      })
      .always(response => {
        store.inTransit = false;
      });
  },
  loadQuestion (qn) {
    window.$.ajax({
      url: store.APIbase + 'data/getq' + qn + '.json',
      dataType: 'json'
    })
      .done(response => {
        store.assessInfo.questions[qn].html = response.html;
      });
  },
  submitQuestion (qn) {
    window.$.ajax({
      url: store.APIbase + 'data/scoreq' + qn + '.json',
      dataType: 'json'
    })
      .done(response => {
        for (let key in response) {
          store.assessInfo.questions[qn][key] = response[key];
        }
      });
  }
};
