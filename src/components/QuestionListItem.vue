<template>
  <span>
    <i :class="questionClass.class"
      :title="questionClass.alt"
    ></i>
    Question {{ option.qn }}
    {{ scoreDisplay }}
    <span class="redoicon">
      <i class="fa fa-undo" v-if="option.canreattempt"></i>
    </span>
  </span>
</template>

<script>
export default {
  name: 'QuestionListItem',
  props: ['option'],
  computed: {
    questionClass () {
      if (this.option.status == 0) {
        //unattempted
        return {
          "class": "far fa-circle bluetext qstatusicon",
          "alt": "Unattempted"
        }
      } else if (!this.option.hasOwnProperty('score')) {
        //attempted, but no score info
        return  {
          "class": "fas fa-circle bluetext qstatusicon",
          "alt": "Attempted"
        }
      } else if (this.option.score == 0) {
        //wrong
        return  {
          "class": "fas fa-times-circle redtext qstatusicon",
          "alt": "Incorrect"
        }
      } else if (this.option.score == this.option.possible) {
        //full score
        return  {
          "class": "fas fa-check-circle greentext qstatusicon",
          "alt": "Correct"
        }
      } else {
        //partial score
        return  {
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
  font-size: 16px;
}
.redoicon {
  display: inline-block;
  width: 40px;
  text-align: right;
}
</style>
