import Vue from 'vue';
import Router from './router';

export const store = Vue.observable({
  assessInfo: null,
  APIbase: null,
  aid: null,
  cid: null,
  queryString: '',
  errorMsg: null,
  inProgress: false
});

export const actions = {
  loadAssessData () {
    store.inTransit = true;
    store.errorMsg = null;
    window.$.ajax({
      url: store.APIbase + 'loadassess.php' + store.queryString,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
      .done(response => {
        response = this.processSettings(response);
        store.assessInfo = response;
      })
      .always(response => {
        store.inTransit = false;
      });
  },
  startAssess (dopractice, password, newGroupMembers) {
    store.inTransit = true;
    store.errorMsg = null;
    window.$.ajax({
      url: store.APIbase + 'startassess.php' + store.queryString,
      type: 'POST',
      dataType: 'json',
      data: {
        do_practice: dopractice,
        password: password,
        new_group_members: newGroupMembers.join(','),
        cur_group: store.assessInfo.stugroupid
      },
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
      .done(response => {
      // overwrite properties with those from response
        response = this.processSettings(response);
        store.assessInfo = Object.assign({}, store.assessInfo, response);

        // route to correct display
        if (response.error) {
          store.errorMsg = response.error;
        } else if (store.assessInfo.has_active_attempt) {
          store.inProgress = true;
          if (store.assessInfo.displaymethod === 'skip') {
            Router.push('/skip/0' + store.queryString);
          } else if (store.assessInfo.displaymethod === 'full') {
            Router.push('/full' + store.queryString);
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
  },
  processSettings (data) {
    if (data.hasOwnProperty('questions')) {
      for (let i=0; i < data.questions.length; i++) {
        let thisq = data.questions[i];

        data.questions[i].canretry = (thisq.try < thisq.tries_max);
        if (typeof thisq.regens_max !== 'undefined' && thisq.regen < thisq.regens_max) {
          data.questions[i].canregen = true;
        } else {
          data.questions[i].canregen = false;
        }
      }
    }
    data['show_scores_during'] = (data.showscores === 'during');
    data['tries_remaining'] = (data.tries_max - data.try);
    if (data.hasOwnProperty('regen')) {
      data['regens_remaining'] = (data.regens_max - data.regen);
    }
    return data;
  }
};
