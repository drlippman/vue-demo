<template>
  <div id="app">
    <div v-if="!assessInfoLoaded">
      {{ $t('loading') }}
    </div>
    <router-view v-if="assessInfoLoaded"/>
  </div>
</template>

<script>
import { store, actions } from './basicstore';

export default {
  computed: {
    assessInfoLoaded () {
      return (store.assessInfo !== null);
    },
    assessName () {
      return store.assessInfo.name;
    },
    queryString () {
      return '?cid=' + store.cid + '&aid=' + store.aid;
    }
  },
  beforeUpdate () {
    // handle routing to launch or closed page if needed
    if (store.assessInfo !== null) {
      if (store.assessInfo.available === 'yes' ||
        (store.assessInfo.available === 'practice' && store.assessInfo.in_practice)
      ) {
        // has a currently available assessment or practice session
        if (!store.inProgress) {
          this.$router.replace('/' + this.queryString);
        }
      } else {
        // currently closed
        this.$router.replace('/closed' + this.queryString);
      }
    }
  },
  created () {
    if (typeof window.APIbase !== 'undefined') {
      store.APIbase = window.APIbase;
    } else {
      store.APIbase = process.env.BASE_URL;
    }
    store.cid = this.$route.query.cid;
    store.aid = this.$route.query.aid;
    store.queryString = '?cid=' + store.cid + '&aid=' + store.aid;
    if (store.assessInfo === null) {
      actions.loadAssessData();
    }
  }
};
</script>

<style>
input[type=submit],input[type=button], button, a.abutton {
  padding: 3px 12px;
  height: auto;
}
input {
  border: 1px solid #999;
  padding: 4px 6px;
  border-radius: 4px;
}
button.slim {
  padding: 0px 12px;
}
button.plain {
  border: 0;
  background-color: #fff;
}
button.plain:hover, button.plain:active {
  background-color: #EDF4FC;
}
input[type=submit].primary,input[type=button].primary, button.primary, a.abutton.primary {
  color: #fff;
  background-color: #1E74D1;
}
input[type=submit].primary:hover, button.primary:hover,input[type=button].primary:hover, a.abutton.primary:hover {
  background-color: #175aa2;
}
input[type=submit].primary:focus, button.primary:focus,input[type=button].primary:focus, a.abutton.primary:focus {
  background-color: #175aa2;
}
input[type=submit].secondarybtn,input[type=button].secondarybtn, button.secondarybtn {
  color: #000;
  background-color: #eee;
}
input[type=submit].secondarybtn:hover,input[type=button].secondarybtn:hover, button.secondarybtn:hover {
  background-color: #ddd;
}
input[type=submit].secondarybtn:focus,input[type=button].secondarybtn:focus, button.secondarybtn:focus {
  background-color: #ddd;
}
.dropdown-menu a {
  text-decoration: none;
}
.subdued {
  color: #aaa;
}
.no-margin-top {
  margin-top: 0;
}
.ind1 {
  margin-left: 20px;
}
.med-below {
  margin-bottom: 16px;
}

</style>
