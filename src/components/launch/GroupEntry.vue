<template>
  <div>
    <p>This is a group assessment</p>
    <div v-if = "groupMembers.length > 0" class="ind1">
      <p>Group Members
        <span v-if = "showMax">
          (max {{ groupMax }})
        </span>
      </p>
      <ul class="no-margin-top">
        <li v-for = "(member,index) in groupMembers">
          {{ member.name }}
          <button
            class="plain slim subdued"
            tabindex = "0"
            v-if = "member.new"
            @click = "removeMember(member.index)"
          >
            Remove
          </button>
        </li>
      </ul>
    </div>
    <div v-if = "canAddMembers" class="ind1">
      <label for="addtogroup">
        Add:
      </label>
      <select v-model = "new_member" id="addtogroup">
        <option value=0>Select...</option>
        <option
          v-for = "user in availableUsers"
          :value = "user.id"
        >
          {{ user.name }}
        </option>
      </select>
      <button
        class="slim"
        @click = "addMember"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import { store } from "../../basicstore";

export default {
  name: 'GroupEntry',
  data: function() {
    return {
      new_member: 0,
      new_group_members: [] //array of user IDs
    }
  },
  computed: {
    groupMax () {
      return store.assessInfo.groupmax;
    },
    groupMembers () {
      var out = [];
      for (let i=0; i < store.assessInfo.group_members.length; i++) {
        out.push({
          name: store.assessInfo.group_members[i],
          new: false
        })
      }
      for (let i=0; i < this.new_group_members.length; i++) {
        out.push({
          name: store.assessInfo.group_avail[this.new_group_members[i]],
          new: true,
          index: i
        })
      }
      return out;
    },
    availableUsers () {
      var out = [];
      for (let userid in store.assessInfo.group_avail) {
        if (this.new_group_members.indexOf(userid) === -1) {
          out.push({
            id: userid,
            name: store.assessInfo.group_avail[userid]
          });
        }
      }
      return out;
    },
    showMax () {
      return (store.assessInfo.isgroup == 2)
    },
    canAddMembers () {
      return (store.assessInfo.isgroup == 2 &&
        this.groupMembers.length < store.assessInfo.groupmax
      );
    }
  },
  methods: {
    removeMember (index) {
      this.new_group_members.splice(index, 1);
      this.handleChange();
    },
    addMember () {
      this.new_group_members.push(this.new_member);
      this.new_member = 0;
      this.handleChange();
    },
    handleChange () {
      this.$emit('update-new-group', this.new_group_members);
    }
  }
}
</script>
