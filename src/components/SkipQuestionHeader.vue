<template>
  <div id="skip-question-header">
    <div style="flex-grow: 1" id="skip-question-select">
        <router-link
          :to="'/skip/'+(qn-1)"
          tag="button"
          :disabled="qn<1"
          class="secondarybtn"
          id="qprev"
        >
          <i class="fa fa-chevron-left" aria-label="Previous"></i>
        </router-link>

        <question-nav :qn="qn" />

        <router-link
          :to="'/skip/'+(qn+1)"
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

    <question-details-menu :qn="qn" v-if="showDetails" />

  </div>
</template>

<script>
import QuestionNav from '@/components/QuestionNav.vue'
import QuestionDetailsMenu from '@/components/QuestionDetailsMenu.vue'

export default {
  name: 'SkipQuestionHeader',
  props: ['qn'],
  components: {
    QuestionNav,
    QuestionDetailsMenu
  },
  data: function() {
    return {

    }
  },
  computed: {
    ainfo () {
      return this.$store.state.assessInfo
    },
    curQData () {
      return this.$store.state.assessInfo.questions[this.qn]
    },
    showDetails () {
      let curQData = this.$store.state.assessInfo.questions[this.qn];
      let hasParts = curQData.hasOwnProperty('parts');
      let hasCategory = curQData.hasOwnProperty('category');
      return (hasParts || hasCategory);
    }
  }
}
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
