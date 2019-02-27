<template>
  <i>
    <svg
      xmlns = "http://www.w3.org/2000/svg"
      class = "svgicon"
      role = "img"
      aria-hidden = "true"
      viewBox="0 0 16 16"
      :width = "iconwidth"
      :height = "iconwidth"
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
      <template v-else-if="name=='retake'">
        <path :fill="dark" fill-rule="evenodd"  d="M11.25 5.25a.75.75 0 0 1-.75-.75.75.75 0 0 0-.75-.75H2.56l.97.97a.75.75 0 1 1-1.06 1.06L.22 3.53a.75.75 0 0 1 0-1.06L2.47.22a.748.748 0 0 1 1.06 0 .75.75 0 0 1 0 1.06l-.97.97h7.19C10.99 2.25 12 3.26 12 4.5a.75.75 0 0 1-.75.75zM.75 6.75a.75.75 0 0 1 .75.75c0 .413.336.75.75.75h7.19l-.97-.97a.75.75 0 1 1 1.06-1.06l2.25 2.25a.75.75 0 0 1 0 1.06l-2.25 2.25a.75.75 0 1 1-1.06-1.06l.97-.97H2.25C1.01 9.75 0 8.74 0 7.5a.75.75 0 0 1 .75-.75z"/>
      </template>
      <template v-else-if="name=='calendar'">
        <path :fill="dark" fill-rule="evenodd" d="M19 2h-3V1a1 1 0 1 0-2 0v1H6V1a1 1 0 1 0-2 0v1H1a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM2 18h16V8H2v10zM2 6h16V4H2v2zm4 4a1 1 0 1 0 0 2 1 1 0 1 0 0-2m0 4a1 1 0 1 0 0 2 1 1 0 1 0 0-2m4 0a1 1 0 1 0 0 2 1 1 0 1 0 0-2m0-4a1 1 0 1 0 0 2 1 1 0 1 0 0-2m4 0a1 1 0 1 0 0 2 1 1 0 1 0 0-2"/>
      </template>
      <template v-else-if="name=='alert'">
        <path :fill="dark" fill-rule="evenodd"  d="M10.894.508c-.339-.677-1.449-.677-1.789 0l-9 18A.999.999 0 0 0 1 19.957h18a.998.998 0 0 0 .894-1.447l-9-18zM2.618 17.956L10 3.193l7.382 14.764H2.618zm6.382-7a1 1 0 1 0 2 0v-2a1 1 0 1 0-2 0v2zm-.1 4a1.1 1.1 0 1 0 2.2 0 1.1 1.1 0 0 0-2.2 0z"/>
      </template>
      <template v-else-if="name=='info'">
        <path :fill="dark" fill-rule="evenodd" d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8m0 14.4A6.407 6.407 0 0 1 1.6 8c0-3.529 2.871-6.4 6.4-6.4 3.529 0 6.4 2.871 6.4 6.4 0 3.529-2.871 6.4-6.4 6.4m.8-4V8a.8.8 0 0 0-.8-.8h-.8a.8.8 0 1 0 0 1.6v2.4a.8.8 0 0 0 .8.8h.8a.8.8 0 1 0 0-1.6M8 5.68a.88.88 0 1 0 0-1.76.88.88 0 0 0 0 1.76"/>
      </template>
      <template v-else-if="name=='timer'">
        <path :fill="dark" fill-rule="evenodd" d="M6 12c-3.308 0-6-2.692-6-6s2.692-6 6-6 6 2.692 6 6-2.692 6-6 6M6 1.5A4.505 4.505 0 0 0 1.5 6c0 2.482 2.018 4.5 4.5 4.5s4.5-2.018 4.5-4.5S8.482 1.5 6 1.5m1.5 6.75a.748.748 0 0 1-.53-.22l-1.5-1.5A.748.748 0 0 1 5.25 6V3.75a.75.75 0 1 1 1.5 0v1.94l1.28 1.28a.75.75 0 0 1-.53 1.28"/>
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
      dark: "#000",
      neutral: "#00a",
      wrong: "#a00",
      correct: "#0a0",
      partial: "#aa0"
    }
  },
  props: ['name', 'size'],
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
    },
    iconwidth () {
      switch (this.size) {
        case 'micro': return 12
        case 'small': return 16
        case 'medium': return 20
      }
      return 16;
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
