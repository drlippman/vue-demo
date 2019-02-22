<template>
  <div id="assess-header">
    <div style="flex-grow: 1">
      <h1>{{ ainfo.name }}</h1>
      <div>
        <span v-if="ainfo.showscores">{{ curScore }}</span>
        <span class="answeredinfo">{{ curAnswered }}</span>
      </div>
    </div>

    <timer v-if="ainfo.timelimit > 0"
      :total="ainfo.timelimit"
      :end="ainfo.timeExpires">
    </timer>

    <button>{{ assessSubmitLabel }}</button>

    <menu-button
      v-if="ainfo.resources.length > 0"
      id="resource-dropdown" position="right"
      header = "Resources"
      nobutton = "true"
      noarrow = "true"
      :options = "ainfo.resources"
    >
      <template v-slot:button>
        <i class="far fa-file-alt bigicon"></i>
      </template>
    </menu-button>
    
    <div>
      <i class="fas fa-print bigicon"></i>
    </div>
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue'
import ResourcePane from '@/components/ResourcePane.vue'
import Dropdown from '@/components/Dropdown.vue'
import MenuButton from '@/components/MenuButton.vue'

export default {
  name: 'AssessHeader',
  components: {
    Timer,
    Dropdown,
    MenuButton,
    ResourcePane
  },
  data: function() {
    return {
      resourceMenuShowing: false
    }
  },
  created () {
    //temporary for demo purposes
    if (this.$store.state.assessInfo.timelimit > 0) {
      let now = new Date().getTime();
      this.$store.state.assessInfo.timeExpires = now + 1000*60*this.$store.state.assessInfo.timelimit;
    }
  },
  computed: {
    ainfo () {
      return this.$store.state.assessInfo
    },
    curScore () {
      let pointsPossible = 0;
      let pointsEarned = 0;
      for (let i in this.ainfo.questions) {
        pointsPossible += this.ainfo.questions[i].possible;
        pointsEarned += this.ainfo.questions[i].score;
      }
      return 'Score: ' + pointsEarned + '/' + pointsPossible
    },
    curAnswered () {
      let qAnswered = 0;
      let nQuestions = this.ainfo.questions.length;
      for (let i in this.ainfo.questions) {
        if (this.ainfo.questions[i].status>0) {
          qAnswered++;
        }
      }
      return qAnswered + '/' + nQuestions + ' answered'
    },
    assessSubmitLabel () {
      return 'Submit Assessment'
    }
  }
}
</script>

<style>
#assess-header {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
#assess-header > * {
  margin-right: 10px;
}
#assess-header h1 {
  margin: .4em 0 .2em;
}
.answeredinfo {
  color: #666666;
  margin-left: 20px;
}
.bigicon {
  font-size: 130%;
}
</style>
