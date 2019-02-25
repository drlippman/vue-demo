<template>
  <span>
    <icons :name="questionClass.icon" class="qstatusicon" />
    Question {{ option.qn }}
    {{ scoreDisplay }}
    <span class="redoicon">
      <i class="fa fa-undo" v-if="option.canreattempt"></i>
    </span>
  </span>
</template>

<script>
import Icons from '@/components/Icons.vue'

export default {
  name: 'QuestionListItem',
  props: ['option'],
  components: {
    Icons
  },
  computed: {
    questionClass () {
      if (this.option.status == 0) {
        //unattempted
        return {
          "icon": "circle-open",
          "class": "far fa-circle bluetext qstatusicon",
          "alt": "Unattempted"
        }
      } else if (!this.option.hasOwnProperty('score')) {
        //attempted, but no score info
        return  {
          "icon": "circle-filled",
          "class": "fas fa-circle bluetext qstatusicon",
          "alt": "Attempted"
        }
      } else if (this.option.score == 0) {
        //wrong
        return  {
          "icon": "circle-x",
          "class": "fas fa-times-circle redtext qstatusicon",
          "alt": "Incorrect"
        }
      } else if (this.option.score == this.option.possible) {
        //full score
        return  {
          "icon": "circle-check",
          "class": "fas fa-check-circle greentext qstatusicon",
          "alt": "Correct"
        }
      } else {
        //partial score
        return  {
          "icon": "circle-filled",
          "class": "fas fa-dot-circle orangetext qstatusicon",
          "alt": "Partially correct"
        }
      }
    },
    scoreDisplay () {
      if (!this.option.hasOwnProperty('score')) {
        return '';
      } else {
        let str = this.option.canreattempt ? '(':'[';
        str += this.option.score + '/' + this.option.possible;
        str += this.option.canreattempt ? ')':']';
        return str;
      }
    }
  }
}
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
