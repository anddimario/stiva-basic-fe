<template>
  <div>
    <div v-if="permissionCheck('viewers', me.userRole)">
      <h3>Uploads</h3>
      <em v-if="uploads.loading">Loading uploads...</em>
      <span
        v-if="uploads.error"
        class="text-danger"
      >ERROR: {{ uploads.error }}</span>
      <ul v-if="uploads.Contents">
        <li
          v-for="upload in uploads.Contents"
          :key="upload.Key"
        >
          {{ upload.Key }}
          <span v-if="upload.deleting"><em> - Deleting...</em></span>
          <span
            v-else-if="upload.deleteError"
            class="text-danger"
          > - ERROR: {{ upload.deleteError }}</span>
          <span v-else> - <a
            class="text-danger"
            @click="deleteUpload(upload.Key)"
          >Delete</a></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import config from 'config';

export default {
  data() {
    return {
      contentsPermissions: config.permissions,
    };
  },
  created() {
    this.getMe();
    this.list();
  },
  computed: {
    ...mapState({
      me: state => state.users.me,
      uploads: state => state.uploads.list
    })
  },
  methods: {
    ...mapActions('users', {
      getMe: 'getMe',
    }),
    ...mapActions('uploads', {
      list: 'list',
      deleteUpload: 'delete'
    }),
    permissionCheck(action, role) {
      return this.contentsPermissions['upload'][action].indexOf(role) > -1
    }
  }
};
</script>
