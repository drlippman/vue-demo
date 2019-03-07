<template>
  <div id="skip-question-header">
    <div style="flex-grow: 1" id="skip-question-select">
        <router-link
          :to="'/skip/'+(dispqn-1)"
          tag="button"
          :disabled="qn<1"
          class="secondarybtn"
          id="qprev"
        >
          <i class="fa fa-chevron-left" aria-label="Previous"></i>
        </router-link>

        <menu-button id="qnav"
          :options = "navOptions"
          :selected = "qn"
          @change = "changeQuestion"
          searchby = "qn"
        >
          <template v-slot="{ option }">
            <question-list-item :option="option" />
          </template>
        </menu-button>

        <router-link
          :to="'/skip/'+(dispqn+1)"
          tag="button"
          :disabled="qn>=ainfo.questions.length-1"
          class="secondarybtn"
          id="qnext"
        >
          <i class="fa fa-chevron-right" aria-label="Next"></i>
        </router-link>
    </div>
    <div>
      <span
        v-if="curQData.canreattempt"
        :title="'Attempt ' + curQData.attempt + ' of ' + curQData.totattempts">
        <i class="fa fa-undo" aria-label="attempt"></i>
        {{ curQData.attempt }}/{{ curQData.totattempts}}
      </span>
      <span
        v-if="curQData.canregen"
        :title="'Version ' + curQData.regen + ' of ' + curQData.totregens">
        <i class="fa fa-retweet" aria-label="version"></i>
        {{ curQData.regen }}/{{ curQData.totregens}}
      </span>
    </div>

    <dropdown id="question-details" position="right" v-if="showDetails">
      <template v-slot:button>
        <i class="fa fa-info-circle bigicon"></i>
        Details
      </template>
      <question-details-pane :qn="qn" />
    </dropdown>

  </div>
</template>

<script>
import QuestionDetailsPane from '@/components/QuestionDetailsPane.vue';
import MenuButton from '@/components/MenuButton.vue';
import Dropdown from '@/components/Dropdown.vue';
import QuestionListItem from '@/components/QuestionListItem.vue';
import { store } from '../basicstore';

export default {
  name: 'SkipQuestionHeader',
  props: ['qn'],
  components: {
    QuestionDetailsPane,
    Dropdown,
    MenuButton,
    QuestionListItem
  },
  data: function () {
    return {

    };
  },
  computed: {
    ainfo () {
      return store.assessInfo;
    },
    curQData () {
      return store.assessInfo.questions[this.qn];
    },
    dispqn () {
      return parseInt(this.qn) + 1;
    },
    navOptions () {
      var out = [];
      for (let qn in store.assessInfo.questions) {
        let qnval = parseInt(qn);
        out[qn] = store.assessInfo.questions[qn];
        out[qn].link = '/skip/' + (qnval + 1);
        out[qn].dispqn = qnval + 1;
      }
      return out;
    },
    showDetails () {
      let curQData = store.assessInfo.questions[this.qn];
      let hasParts = curQData.hasOwnProperty('parts');
      let hasCategory = curQData.hasOwnProperty('category');
      return (hasParts || hasCategory);
    }
  },
  methods: {
    changeQuestion (newqn) {
      this.$router.push({ path: '/skip/' + newqn });
    }
  }
};
</script>

<style>
#skip-question-header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
}
#skip-question-header > * {
  margin-right: 10px;
}
#skip-question-select {
  display: flex;
  flex-flow: row nowrap;
  align-items: stretch;
}
.bigicon {
  font-size: 130%;
}
#qprev {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
#qnext {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
#qprev, #qnext {
  margin: 0;
  padding: 3px 8px;
}
</style>
