<template>
  <div id="resource-pane">
    <div class="pane-header">
      Resources
    </div>
    <div class="pane-body">
      <ul id="resource-list">
        <li v-for="curResource in assessResources">
          <a :href="curResource.url" target="_blank">
            {{ curResource.title }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResourcePane',
  computed: {
    assessResources () {
      return this.$store.state.assessInfo.resources
    }
  },
}
</script>

<style>
#resource-pane {
  padding: 0;
  margin: 0;
  min-width: 160px;
}
.pane-header {
  border-bottom: 1px solid #ccc;
  padding: 16px 20px;
  font-weight: bold;
}
.pane-body {
  padding: 16px 20px;
}
#resource-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#resource-list li {
  padding: 8px 0;
}
</style>
