<template>
  <div class="assess-header headerpane">
    <div style="flex-grow: 1">
      <h1>{{ ainfo.name }}</h1>
    </div>
    <div v-if="showGBScore">
      <strong>{{ $t('summary.recordedscore') }}: {{ gbScore }}</strong>
      <br/>
      <span class="small subdued">
        {{ scoreUsed }}
      </span>
    </div>
    <div>
      <button
        v-if="canRetake"
        @click = "retake"
      >
        {{ $t('launch.retake_assess') }}
      </button>
      <button
        v-if="!ainfo.is_lti"
        @click = "exit"
      >
        {{ $t('closed.exit') }}
      </button>
    </div>
  </div>
</template>

<script>
import { store } from '../../basicstore';

export default {
  name: 'SummaryHeader',
  computed: {
    ainfo () {
      return store.assessInfo;
    },
    scoreUsed () {
      if (this.ainfo.scored_attempt.kept === 'override') {
        return this.$t('summary.use_override');
      } else if (this.ainfo.keepscore === 'best') {
        return this.$t('setlist.keep_highest');
      } else if (this.ainfo.keepscore === 'average') {
        return this.$t('setlist.keep_highest');
      } else if (this.ainfo.keepscore === 'last') {
        return this.$t('setlist.keep_last');
      }
    },
    showGBScore () {
      return (this.ainfo.hasOwnProperty('scored_attempt') && this.ainfo.showscores !== 'none');
    },
    gbScore () {
      return Math.round(1000 * this.ainfo.scored_attempt.score / this.ainfo.points_possible) / 10;
    },
    canRetake () {
      return (this.ainfo.submitby === 'by_assessment' &&
        this.ainfo.prev_attempts.length < this.ainfo.allowed_attempts);
    }
  },
  methods: {
    exit () {

    },
    retake () {
      store.assessInfo = null;
      this.$router.push('/' + store.queryString);
    }
  }
}
</script>
