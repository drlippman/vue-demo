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
      url: store.APIbase + 'loadquestion.php' + store.queryString,
      type: 'POST',
      dataType: 'json',
      data: {
        qn: qn,
      },
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true
    })
      .done(response => {
        response = this.processSettings(response);
        // overwrite existing questions with new data
        for (let i in response.questions) {
          store.assessInfo.questions[parseInt(i)] = response.questions[i];
        }
        delete response.questions;
        // copy other settings from response to store
        store.assessInfo = Object.assign({}, store.assessInfo, response);
      });
  },
  submitQuestion (qn, autosave) {
    if (typeof window.tinyMCE != "undefined") {window.tinyMCE.triggerSave();}
    let data = new FormData();
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
    data.append('toscoreqn', qn);
    data.append('lastloaded', 0);   // TODO
    data.append('autosave', autosave);
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
        response = this.processSettings(response);
        // overwrite existing questions with new data
        for (let i in response.questions) {
          store.assessInfo.questions[parseInt(i)] = response.questions[i];
        }
        delete response.questions;
        // copy other settings from response to store
        store.assessInfo = Object.assign({}, store.assessInfo, response);
      });
  },
  processSettings (data) {
    if (data.hasOwnProperty('questions')) {
      for (let i in data.questions) {
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
