<template>
  <i>
    <svg
      xmlns = "http://www.w3.org/2000/svg"
      class = "svgicon"
      role = "img"
      aria-hidden = "true"
    >
      <template v-if="name=='circle-filled'">
        <circle cx="8" cy="8" r="8" :fill="neutral" stroke="none"/>
      </template>
      <template v-else-if="name=='circle-open'">
        <circle cx="8" cy="8" r="7" fill="none" stroke-width="2" :stroke="neutral" />
      </template>
      <template v-else-if="name=='circle-half'">
        <path d="M0,8 a1,1 0 0,0 16,0" stroke="none" :fill="neutral" />
        <circle cx="8" cy="8" r="7" fill="none" stroke-width="2" :stroke="neutral" />
      </template>
      <template v-else-if="name=='circle-x'">
        <circle cx="8" cy="8" r="8" :fill="wrong" stroke="none"/>
        <path d="M4 4 L12 12 M4 12 L12 4" stroke-width="2" stroke="white" fill="none" />
      </template>
      <template v-else-if="name=='circle-check'">
        <circle cx="8" cy="8" r="8" :fill="correct" stroke="none"/>
        <path d="M4 8 L7 11 L12 4" stroke-width="2" fill="none" stroke="white" />
      </template>
    </svg>
    <span class="sronly" v-if="alttext.length > 0">
      {{ alttext }}
    </span>
  </i>
</template>

<script>
export default {
  name: 'Icons',
  data: function() {
    return {
      id: null,
      neutral: "#00a",
      wrong: "#a00",
      correct: "#0a0",
      partial: "#aa0"
    }
  },
  props: ['name'],
  computed: {
    alttext () {
      switch (this.name) {
        case 'circle-filled': return 'Attempted'
        case 'circle-open': return 'Unattempted'
        case 'circle-half': return 'Partially attempted'
        case 'circle-x': return 'Incorrect'
        case 'circle-check': return 'Correct'
      }
      return ''
    }
  }
}
</script>

<style>
svg.svgicon {
  width: 16px;
  height: 16px;
  margin-bottom: -0.15em;
}
.sronly {
  position: absolute;
  left: -10000px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>
