<template>
  <div class = "interqtext">
    <button
      :class = "{plain: true, floatright: !expanded}"
      :aria-label = "expanded ? $t('text.hide') : $t('text.show')"
      :aria-expanded = "expanded"
      @click = "expanded = !expanded"
    >
      <icons v-if="expanded" name="close" />
      <span v-else>{{ $t('text.show') }}</span>
    </button>
    <div v-if="expanded" v-html="textobj.html" />
  </div>
</template>

<script>
import Icons from '@/components/Icons.vue';

export default {
  name: 'InterQuestionText',
  props: ['textobj'],
  components: {
    Icons
  },
  data: function () {
    return {
      expanded: false
    };
  },
  mounted () {
    this.expanded = textobj.expanded;
  }
}
</script>
