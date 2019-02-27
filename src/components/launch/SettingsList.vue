<template>
  <div class="settings-list">
    <div class="flexrow" v-for="row in settingRows">
      <div>
        <icons :name="row.icon" size="small"/>
      </div>
      <div>
        <div>
          {{ row.str }}
        </div>
        <div class="small subdued" v-if="!!row.sub">
          {{ row.sub }}
        </div>
        <div class="small subdued" v-if="!!row.alert">
          <icons name="alert" size="micro" />
          {{ row.alert }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icons from '@/components/Icons.vue'
import { store } from "../../basicstore";

export default {
  name: 'SettingsList',
  components: {
    Icons
  },
  computed: {
    settingRows() {
      var out = [];
      var settings = store.assessInfo;
      //points possible
      out.push(this.getPointsObj());

      //due date
      out.push(this.getDateObj());

      //retakes
      if (settings.submitby == 'by_assessment' && settings.allowed_takes > 1) {
        out.push(this.getTakeObj());
      }

      //time limit
      if (settings.timelimit > 0) {
        out.push(this.getTimelimitObj());
      }
      return out;
    }
  },
  methods: {
    formatDate (timestamp) {
      //TODO:  localize this
      var date = new Date(timestamp * 1000);
      return date.toString();
    },
    getPointsObj () {
      var settings = store.assessInfo;
      var pointsobj = {
        icon: 'info',
        str: settings.points_possible + ' points possible'
      }
      return pointsobj;
    },
    getDateObj () {
      var settings = store.assessInfo;
      var dateobj = {
        icon: 'calendar',
        str: 'Due ' + this.formatDate(settings.enddate)
      }
      if (settings.hasOwnProperty('original_enddate')) {
        dateobj.sub = 'Originally due ' + this.formatDate(settings.original_enddate) + '. ';
        if (settings.extended_with.type == 'latepass') {
          dateobj.sub += 'You used ' + settings.extended_with.n + ' latepasses.';
        } else {
          dateobj.sub += 'You were granted an extension.';
        }
        if (settings.exceptionpenalty > 0) {
          dateobj.alert = 'A penalty of ' + settings.exceptionpenalty + '% will be applied.'
        }
      }
      return dateobj;
    },
    getTakeObj () {
      var settings = store.assessInfo;
      var mainstr, takesLeftStr, substr, alertstr;

      var takes_left = settings.allowed_takes - settings.prev_takes.length;
      if (settings.prev_takes.length == 0) {
        takesLeftStr = 'You can take this assessment ' + takes_left + ' times'
      } else {
        takesLeftStr = 'You can take this assessment ' + takes_left + ' more times'
      }

      if (settings.has_active_take) {
        mainstr = 'You are currently taking this assessment for the ' + (settings.prev_takes.length + 1) + ' time';
        substr = takesLeftStr + '<br/>';
      } else {
        mainstr = takesLeftStr;
        substr = '';
      }

      if (settings.keepscore == 'best') {
        substr += 'Highest score recorded as grade'
      } else if (settings.keepscore == 'average') {
        substr += 'Average score recorded as grade'
      } else if (settings.keepscore == 'last') {
        substr += 'Last score recorded as grade'
      }

      if (settings.prev_takes.length > 0 && settings.retake_penalty > 0) {
        let penalty = settings.prev_takes.length * settings.retake_penalty;
        alertstr = 'A penalty of ' + penalty + '% will be applied on the next retake'
      }

      return {
        icon: 'retake',
        str: mainstr,
        sub: substr,
        alert: alertstr
      }
    },
    getTimelimitObj () {
      var settings = store.assessInfo;
      var timeobj = {
        icon: 'timer'
      };
      var mytime = settings.timelimit * settings.timelimit_multiplier;
      timeobj.str = 'Time limit: ' + mytime + ' seconds';
      if (settings.timelimit_multiplier > 1) {
        timeobj.sub = 'Extended from the original ' + settings.timelimit + ' seconds';
      }
      if (settings.has_active_take) {
        timeobj.alert = 'Your current assessment time limit expires at '
        timeobj.alert += this.formatDate(settings.timelimit_expires)
      }
      return timeobj;
    }
  }
}
</script>

<style>
.settings-list .flexrow {
  margin-bottom: 16px;
}
.settings-list svg {
  padding: 0 15px;
}
.settings-list .small svg {
  padding: 0 10px 0 0;
}
.flexrow {
  display: flex;
  flex-flow: row nowrap;
}
.subdued {
  color: #637381;
}
</style>
