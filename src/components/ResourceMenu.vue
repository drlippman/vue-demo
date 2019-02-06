<template>
  <div class="dropdown">
   <div
      tabindex=0
      role=button
      aria-haspopup=true
      aria-expanded=false
      aria-controls="resource-menu"
      class="dropdown-toggle"
      data-toggle="dropdown"
    >
      <i class="far fa-file-alt bigicon"></i>
    </div>
    <ul id="resource-menu" role="menu" class="dropdown-menu dropdown-menu-right">
      <li class="dropdown-header">Resources</li>
      <li v-for="curResource in assessResources">
        <a :href="curResource.url">
          {{ curResource.title }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ResourceMenu',
  computed: {
    assessResources () {
      return this.$store.state.assessInfo.resources
    }
  },
  mounted () {
    $(".dropdown-toggle").dropdown();
  }
}
</script>
