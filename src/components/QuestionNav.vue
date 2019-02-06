<template>
  <div class="dropdown">
    <div
       tabindex=0
       role=button
       aria-haspopup=true
       aria-expanded=false
       aria-controls="question-nav"
       class="questionnav dropdown-toggle"
       data-toggle="dropdown"
     >
      <i :class="questionClasses[qn].class"
        :aria-label="questionClasses[qn].alt"
        :title="questionClasses[qn].alt"
        ></i>
      Question {{ qn+1 }}
      {{ scoreDisplay[qn] }}
      <span class="redoicon">
        <i class="fa fa-undo" v-if="qdata[qn].canreattempt"></i>
      </span>
      <i class="fa fa-caret-down" style="margin-left: 10px"></i>
    </div>
    <ul class="dropdown-menu">
      <li v-for="(q,index) in qdata" :key="index">
        <router-link :to="'/skip/'+index">
          <i :class="questionClasses[index].class"
            :aria-label="questionClasses[index].alt"
            :title="questionClasses[index].alt"
            ></i>
          {{ 'Question '+(index+1) }}
          {{ scoreDisplay[index] }}
          <i class="fa fa-undo redoicon" v-if="qdata[index].canreattempt"></i>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'QuestionNav',
  props: ['qn'],
  computed: {
    qdata () {
      return this.$store.state.assessInfo.questions
    },
    questionClasses () {
      var out = [];
      for (let i=0; i < this.qdata.length; i++) {
        if (this.qdata[i].status == 0) {
          //unattempted
          out.push({
            "class": "far fa-circle bluetext qstatusicon",
            "alt": "Unattempted"
          })
        } else if (!this.qdata[i].hasOwnProperty('score')) {
          //attempted, but no score info
          out.push({
            "class": "fas fa-circle bluetext qstatusicon",
            "alt": "Attempted"
          })
        } else if (this.qdata[i].score == 0) {
          //wrong
          out.push({
            "class": "fas fa-times-circle redtext qstatusicon",
            "alt": "Incorrect"
          })
        } else if (this.qdata[i].score == this.qdata[i].possible) {
          //full score
          out.push({
            "class": "fas fa-check-circle greentext qstatusicon",
            "alt": "Correct"
          })
        } else {
          //partial score
          out.push({
            "class": "fas fa-dot-circle orangetext qstatusicon",
            "alt": "Partially correct"
          })
        }
      }
      return out;
    },
    scoreDisplay () {
      var out = [];
      for (let i=0; i < this.qdata.length; i++) {
        if (!this.qdata[i].hasOwnProperty('score')) {
          out.push('');
        } else {
          let str = this.qdata[i].canreattempt ? '(':'[';
          str += this.qdata[i].score + '/' + this.qdata[i].possible;
          str += this.qdata[i].canreattempt ? ')':']';
          out.push(str);
        }
      }
      return out;
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
