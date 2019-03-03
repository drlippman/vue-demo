<template>
  <i>
    <svg
      xmlns = "http://www.w3.org/2000/svg"
      class = "svgicon"
      role = "img"
      aria-hidden = "true"
      viewBox="0 0 24 24"
      :width = "iconwidth"
      :height = "iconwidth"
      fill="none"
      stroke="#000"
      :stroke-width="strokewidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <template v-if="name=='retake'">
        <polyline points="17 1 21 5 17 9"></polyline>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
        <polyline points="7 23 3 19 7 15"></polyline>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
        </template>
      <template v-else-if="name=='calendar'">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </template>
      <template v-else-if="name=='reattempt'">
        <polyline points="1 4 1 10 7 10"></polyline>
        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
      </template>
      <template v-else-if="name=='alert'">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12" y2="17"></line>
      </template>
      <template v-else-if="name=='info'">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="16" x2="12" y2="12"></line>
        <line x1="12" y1="8" x2="12" y2="8"></line>
      </template>
      <template v-else-if="name=='timer'">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </template>
      <template v-else-if="name=='lock'">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </template>
      <template v-else-if="name=='square-check'">
        <polyline points="9 11 12 14 22 4"></polyline>
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
      </template>
      <template v-else-if="name=='group'">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </template>

    </svg>
    <span class="sronly" v-if="alttext.length > 0">
      {{ alttext }}
    </span>
  </i>
</template>

<script>
// Icon SVG comes from https://feathericons.com/, MIT licensed

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
    },
    strokewidth () {
      switch (this.size) {
        case 'micro': return 2.5
        case 'small': return 2
        case 'medium': return 2
      }
      return 2;
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
