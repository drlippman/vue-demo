<template>
  <div class="inline">
    <button
      type="button"
      class="plain"
      @click="expanded = !expanded"
      :aria-expanded = "expanded ? 'true' : 'false'"
    >
      <icons name="alert" />
      {{ $t("penalties.applied")}}
    </button>
    <ul
      class="listpane"
      v-if="expanded"
    >
      <li v-for="(penalty, index) in penalties" :key="index">
        {{ penalty.pct }}% {{ $t("penalties." + penalty.type) }}
      </li>
    </ul>
  </div>
</template>

<script>
import { store } from '../basicstore';
import Icons from '@/components/Icons.vue';

export default {
  name: 'PreviousAttempts',
  props: ['qn', 'part'],
  data: function () {
    return {
      expanded: false
    }
  },
  components: {
    Icons
  },
  computed: {
    penalties () {
      let by_questions = (store.assessInfo.submitby === 'by_question');
      let penalties = store.assessInfo.questions[this.qn].parts[this.part].penalties;
      for (let i in penalties) {
        if (penalties[i].type === 'regen' && by_questions) {
          penalties[i].type = 'trysimilar';
        }
      }
      return penalties;
    }
  }
}
</script>

<style>
.listpane {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.listpane li {
  padding: 8px 0;
}
.inline {
  display: inline-block;
}
</style>
