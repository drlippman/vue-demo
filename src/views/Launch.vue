<template>
  <div class="home">
    <h1>{{ aInfo.name }}</h1>

    <div class="med-below" v-html="aInfo.summary"></div>

    <settings-list />

    <div class="settings-list">
      <div class="flexrow" v-if="aInfo.has_password">
        <div>
          <icons name="lock" size="small"/>
        </div>
        <password-entry v-model="password"  />
      </div>
      <div class="flexrow" v-if="aInfo.isgroup > 0">
        <div>
          <icons name="group" size="small" />
        </div>
        <group-entry @update-new-group="updateNewGroup" />
      </div>
    </div>

    <p v-if="okToLaunch">
      <button @click="startAssess" class="primary">
        {{ startLabel }}
      </button>
    </p>
  </div>
</template>

<script>
/* TODO
  Pane for previous attempt scores
*/
import SettingsList from '@/components/launch/SettingsList.vue'
import PasswordEntry from '@/components/launch/PasswordEntry.vue'
import GroupEntry from '@/components/launch/GroupEntry.vue'
import Icons from '@/components/IconsFA.vue'

import { store, actions } from "../basicstore";

export default {
  name: 'Launch',
  components: {
    SettingsList,
    PasswordEntry,
    GroupEntry,
    Icons
  },
  data: function() {
    return {
      password: '',
      new_group_members: []
    }
  },
  computed: {
    aInfo () {
      return store.assessInfo
    },
    startLabel () {
      if (this.aInfo.has_active_attempt) {
        return this.$t('launch.continue_assess')
      } else if (this.aInfo.submitby == 'by_assessment' &&
        this.aInfo.prev_attempts.length > 0
      ) {
        return this.$t('launch.retake_assess')
      } else {
        return this.$t('launch.start_assess')
      }
    },
    okToLaunch () {
      if (this.aInfo.isgroup === 3 && this.aInfo.group_members.length === 0) {
        // If it's instructor-created groups and not in a group yet
        return false;
      }
      return true;
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
