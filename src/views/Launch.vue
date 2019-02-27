<template>
  <div class="home">
    <h1>{{ aInfo.name }}</h1>

    <p>{{ $t("hello") }}</p>
    
    <settings-list />

    <div v-html="aInfo.summary"></div>

    <password-entry
      v-if = "aInfo.has_password"
      v-model = "password"
    />

    <group-entry
      v-if="aInfo.isgroup > 0"
      v-on:update-new-group = "updateNewGroup"
    />

    <p>
      <button @click="startAssess" class="primary">
        {{ startLabel }}
      </button>
    </p>
  </div>
</template>

<i18n>
{
  "en": {
    "hello": "hello!"
  }
}
</i18n>

<script>
import SettingsList from '@/components/launch/SettingsList.vue'
import PasswordEntry from '@/components/launch/PasswordEntry.vue'
import GroupEntry from '@/components/launch/GroupEntry.vue'

import { store, actions } from "../basicstore";

export default {
  name: 'launch',
  components: {
    SettingsList,
    PasswordEntry,
    GroupEntry
  },
  data: function() {
    return {
      password: 'asdf',
      new_group_members: []
    }
  },
  computed: {
    aInfo () {
      return store.assessInfo
    },
    startLabel () {
      if (this.aInfo.has_active_take) {
        return 'Continue Assessment'
      } else if (this.aInfo.submitby == 'by_assessment' &&
        this.aInfo.prev_takes.length > 0
      ) {
        return 'Retake Assessment'
      } else {
        return 'Start Assessment'
      }
    }
  },
  methods: {
    startAssess () {
      console.log(this.password);
      console.log(this.new_group_members.toString());
      //this.$router.push('/skip/1')
    },
    updateNewGroup (new_members) {
      this.new_group_members = new_members;
    }
  }
}
</script>
