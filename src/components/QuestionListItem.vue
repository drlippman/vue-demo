<template>
  <span>
    <icons :name="statusIcon" class="qstatusicon" />
    {{ nameDisp }}
    {{ scoreDisplay }}
    <span class="redoicon" v-if="option.dispqn > 0">
      <icons name="retry" v-if="option.canretry" />
    </span>
  </span>
</template>

<script>
import Icons from '@/components/Icons.vue';

export default {
  name: 'QuestionListItem',
  props: ['option'],
  components: {
    Icons
  },
  computed: {
    statusIcon () {
      if (this.option.dispqn === 0) {
        return 'none';
      } else if (this.option.try === 0) {
        return 'dot';
      } else if (!this.option.hasOwnProperty('score')) {
        return 'attempted';
      } else if (this.option.score === 0) {
        return 'incorrect';
      } else if (this.option.score === this.option.points) {
        return 'correct';
      } else {
        return 'partialcorrect';
      }
    },
    nameDisp () {
      if (this.option.dispqn === 0) {
        return this.$t('intro');
      } else {
        return this.$t('question_n', { n: this.option.dispqn });
      }
    },
    scoreDisplay () {
      if (this.option.dispqn === 0) {
        return '';
      } else if (!this.option.hasOwnProperty('score')) {
        return this.$tc('header.pts', this.option.points_possible);
      } else {
        let str = this.option.canretry ? '(' : '[';
        str += this.option.score + '/' + this.option.points_possible;
        str += this.option.canretry ? ')' : ']';
        return str;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.questionnav {
  display: inline-block;
  border: 1px solid #ccc;
  padding: 5px 10px;
}
.greentext {
  color: #090;
}
.orangetext {
  color: #AA5D00;
}
.redtext {
  color: #900;
}
.bluetext {
  color: #009;
}
.qstatusicon {
  margin-right: 4px;
}
.redoicon {
  display: inline-block;
  width: 40px;
  text-align: right;
}
</style>
