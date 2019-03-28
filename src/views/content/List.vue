<template>
  <div>
    <div v-if="permissionCheck('viewers', me.userRole)">
      <form @submit.prevent="searchContentsSubmit">
        <vue-form-generator
          :schema="schema"
          :model="model"
          :options="formOptions"
        />
        <div class="form-group">
          <button
            class="btn btn-primary"
          >
            Search
          </button>
        </div>
      </form>

      <h3>{{ contentType }}:</h3>
      <em v-if="contents.loading">Loading contents...</em>
      <span
        v-if="contents.error"
        class="text-danger"
      >ERROR: {{ contents.error }}</span>
      <ul v-if="contents.items">
        <li
          v-for="content in contents.items"
          :key="content.id"
        >
          {{ content.title }} {{ content.contentType }}
          <span v-if="content.deleting"><em> - Deleting...</em></span>
          <span
            v-else-if="content.deleteError"
            class="text-danger"
          > - ERROR: {{ content.deleteError }}</span>
          <span v-else> - <a
            class="text-danger"
            @click="deleteContent({id: content.id, contentType: 'post'})"
          >Delete</a>
            <router-link :to="'/contents/' + contentType + '/update?id=' + content.id">
              Update
            </router-link>
          </span>
        </li>
      </ul>
      <p v-if="next">
        {{ next }}
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { contentsForms } from '../../forms/contentsSearch';
import config from 'config';

export default {
  data() {
    return {
      contentType: this.$route.path.split('/')[2],
      model: contentsForms[this.$route.path.split('/')[2]].model,
      schema: contentsForms[this.$route.path.split('/')[2]].schema,
      formOptions: contentsForms[this.$route.path.split('/')[2]].formOptions,
      submitted: false,
      contentsPermissions: config.permissions,
    };
  },
  computed: {
    ...mapState({
      me: state => state.users.me,
      contents: state => state.contents.list,
      next: state => state.contents.next,
    })
  },
  created() {
    this.getMe();
    this.list({
      contentType: this.contentType
    });
  },
  methods: {
    ...mapActions('users', {
      getMe: 'getMe'
    }),
    ...mapActions('contents', {
      list: 'list',
      deleteContent: 'delete',
    }),
    searchContentsSubmit(e) {
      this.submitted = true;
      this.list(this.model);
    },
    permissionCheck(action, role) {
      return this.contentsPermissions[this.contentType][action].indexOf(role) > -1
    }
  },
};
</script>
