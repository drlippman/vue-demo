<template>
  <div class="assess-header headerpane">
    <div style="flex-grow: 1">
      <h1>{{ ainfo.name }}</h1>
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
    }
  }
}
</script>
