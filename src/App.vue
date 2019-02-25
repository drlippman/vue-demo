<template>
  <div id="app">
    <div v-if="!assessInfoLoaded">
      Loading...
    </div>
    <router-view v-if="assessInfoLoaded"/>
  </div>
</template>

<script>
import { store, actions } from "./basicstore";

export default {
  computed: {
    assessInfoLoaded () {
      return (store.assessInfo !== null)
    },
    assessName () {
      return store.assessInfo.name
    }
  },
  created () {
    if (store.assessInfo === null) {
      actions.loadAssessData();
    }
  }
}
</script>

<style>
input[type=submit],input[type=button], button, a.abutton {
	color: #fff;
	background-color: #1E74D1;
	padding: 3px 12px;
	height: auto;
}
input {
  border: 1px solid #999;
  padding: 4px 6px;
  border-radius: 4px;

}
input[type=submit]:hover, button:hover,input[type=button]:hover, a.abutton:hover {
	background-color: #175aa2;
}
input[type=submit]:focus, button:focus,input[type=button]:focus, a.abutton:focus {
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
</style>
