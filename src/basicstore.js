import Vue from 'vue';
import Router from './router';

export const store = Vue.observable({
  assessInfo: null,
  APIbase: null,
  aid: null,
  cid: null,
  queryString: '',
  errorMsg: null,
  lastLoaded: [],
  inProgress: false,
  assessFormIsDirty: [],
  timelimit_timer: null,
  timelimit_expired: false
});

export const actions = {
  loadAssessData (callback) {
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
        if (response.hasOwnProperty('error')) {
          store.errorMsg = response.error;
          return;
        }
        // reset store
        store.inProgress = false;
        store.timelimit_expired = false;
        clearTimeout(store.timelimit_timer);
        // parse response
        response = this.processSettings(response);
        store.assessInfo = response;
        if (typeof callback !== 'undefined') {
          callback();
        }
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
        if (response.hasOwnProperty('error')) {
          store.errorMsg = response.error;
          return;
        }
      // overwrite properties with those from response
        response = this.processSettings(response);
        store.assessInfo = Object.assign({}, store.assessInfo, response);

        // route to correct display
        if (response.error) {
          store.errorMsg = response.error;
        } else if (store.assessInfo.has_active_attempt) {
          store.inProgress = true;
          if (store.assessInfo.displaymethod === 'skip') {
            if (store.assessInfo.intro != '') {
              Router.push('/skip/0' + store.queryString);
            } else {
              Router.push('/skip/1' + store.queryString);
            }
          } else if (store.assessInfo.displaymethod === 'full') {
            Router.push('/full' + store.queryString);
          }
        }
      })
      .always(response => {
        store.inTransit = false;
      });
  },
  loadQuestion (qn, regen) {
    store.inTransit = true;
    window.$.ajax({
      url: store.APIbase + 'loadquestion.php' + store.queryString,
      type: 'POST',
      dataType: 'json',
      data: {
        qn: qn,
        regen: regen?1:0
      },
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
      .done(response => {
        if (response.hasOwnProperty('error')) {
          store.errorMsg = response.error;
          return;
        }
        response = this.processSettings(response);
        this.copySettings(response);
      })
      .always(response => {
        store.inTransit = false;
      });
  },
  submitQuestion (qns, autosave, endattempt, timeactive) {
    if (typeof qns !== 'object') {
      qns = [qns];
    }
    if (typeof timeactive !== 'object') {
      timeactive = [timeactive];
    }
    store.inTransit = true;
    let lastLoaded = [];
    if (typeof window.tinyMCE != "undefined") {window.tinyMCE.triggerSave();}
    let data = new FormData();
    for (let k=0; k<qns.length; k++) {
      let qn = qns[k];
      var regex = new RegExp("^(qn|tc|qs)("+qn+"\\b|"+(qn+1)+"\\d{3})");
      window.$("#questionwrap" + qn).find("input,select,textarea").each(function(i,el) {
        if (el.name.match(regex)) {
          if ((el.type!=='radio' && el.type!=='checkbox') || el.checked) {
            if (el.type==='file') {
              data.append(el.name, el.files[0]);
            } else {
              data.append(el.name, el.value);
            }
          }
        }
      });
      lastLoaded[k] = store.lastLoaded[qn];
    };
    data.append('toscoreqn', qns.join(','));
    data.append('timeactive', timeactive.join(','));
    data.append('lastloaded', lastLoaded.join(','));
    if (autosave) {
      data.append('autosave', autosave);
    }
    if (endattempt) {
      data.append('endattempt', endattempt);
    }
    window.$.ajax({
      url: store.APIbase + 'scorequestion.php' + store.queryString,
      type: 'POST',
      dataType: 'json',
      data: data,
      processData: false,
      contentType: false,
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
      .done(response => {
        if (response.hasOwnProperty('error')) {
          store.errorMsg = response.error;
          return;
        }
        response = this.processSettings(response);
        // un-dirty submitted questions
        var loc;
        for (let k=0; k<qns.length; k++) {
          let qn = qns[k]*1;
          if ((loc = store.assessFormIsDirty.indexOf(qn)) !== -1) {
		    	    store.assessFormIsDirty.splice(loc,1);
		    	}
        }
        this.copySettings(response);
        if (endattempt) {
          store.inProgress = false;
          Router.push('/summary' + store.queryString);
        }
      })
      .always(response => {
        store.inTransit = false;
      });
  },
  handleTimelimitUp () {
    if (store.assessInfo.has_active_attempt) {
      // submit dirty questions and end attempt
      let tosub = (store.assessFormIsDirty.length > 0) ? store.assessFormIsDirty : -1;
      this.submitQuestion(tosub, false, true);
    }
    //store.timelimit_expired = true;
  },
  endAssess () {
    store.inTransit = true;
    store.errorMsg = null;
    window.$.ajax({
      url: store.APIbase + 'endassess.php' + store.queryString,
      dataType: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
      .done(response => {
        if (response.hasOwnProperty('error')) {
          store.errorMsg = response.error;
          return;
        }
        response = this.processSettings(response);
        this.copySettings(response);
      })
      .always(response => {
        store.inTransit = false;
      });
  },
  copySettings(response) {
    // overwrite existing questions with new data
    if (response.hasOwnProperty('questions')) {
      if (!store.assessInfo.hasOwnProperty('questions')) {
        store.assessInfo.questions = [];
      }
      for (let i in response.questions) {
        store.assessInfo.questions[parseInt(i)] = response.questions[i];
      }
      delete response.questions;
    }
    // copy other settings from response to store
    store.assessInfo = Object.assign({}, store.assessInfo, response);
  },
  processSettings (data) {
    if (data.hasOwnProperty('questions')) {
      for (let i in data.questions) {
        let thisq = data.questions[i];

        data.questions[i].canretry = (thisq.try < thisq.tries_max);
        data.questions[i].tries_remaining = thisq.tries_max - thisq.try;
        if (thisq.hasOwnProperty('regens_max') !== 'undefined' && thisq.regen < thisq.regens_max) {
          data.questions[i].canregen = true;
          data.questions[i].regens_remaining = thisq.regens_max - thisq.regen;
        } else {
          data.questions[i].canregen = false;
          data.questions[i].regens_remaining = 0;
        }
        store.lastLoaded[i] = new Date();
      }
    }
    if (data.hasOwnProperty('showscores')) {
      data['show_scores_during'] = (data.showscores === 'during');
    }
    if (data.hasOwnProperty('regen')) {
      data['regens_remaining'] = (data.regens_max - data.regen);
    }
    if (data.hasOwnProperty('timelimit_expires')) {
      clearTimeout(store.timelimit_timer);
      let now = new Date();
      let expires = new Date(data.timelimit_expires * 1000);
      if (expires > now) {
        store.timelimit_timer = setTimeout(()=>{this.handleTimelimitUp();}, expires - now);
        store.timelimit_expired = false;
      } else {
        store.timelimit_expired = true;
      }
    }
    if (data.hasOwnProperty('interquestion_text')) {
      // ensure proper data type on these
      for (let i in data.interquestion_text) {
        data.interquestion_text[i].displayBefore = parseInt(data.interquestion_text[i].displayBefore);
        data.interquestion_text[i].displayUntil = parseInt(data.interquestion_text[i].displayUntil);
        data.interquestion_text[i].forntype = !!data.interquestion_text[i].forntype;
        data.interquestion_text[i].ispage = !!data.interquestion_text[i].ispage;
      }
    }
    return data;
  }
};
