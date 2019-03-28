<template>
  <div>
    <h2>Add content</h2>
    <div v-if="permissionCheck('creators', me.userRole)">
      <form @submit.prevent="handleSubmit">
        <vue-form-generator
          :schema="schema"
          :model="model"
          :options="formOptions"
        />

        <div class="form-group">
          <button
            class="btn btn-primary"
            :disabled="added.loading"
          >
            Add
          </button>
          <img
            v-show="added.loading"
            src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
          >
          <router-link
            to="/"
            class="btn btn-link"
          >
            Cancel
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { contentsForms } from '../../forms/contentsAdd';
import config from 'config';

export default {
  data() {
    return {
      contentType: this.$route.path.split('/')[2],
      model: contentsForms[this.$route.path.split('/')[2]].model,
      schema: contentsForms[this.$route.path.split('/')[2]].schema,
      formOptions: contentsForms[this.$route.path.split('/')[2]].formOptions,
      submitted: false,
      contentsPermissions: config.permissions
    };
  },
  created() {
    this.getMe();
  },
  computed: {
    ...mapState({
      me: state => state.users.me,
      added: state => state.contents.added
    })
  },
  methods: {
    ...mapActions('users', {
      getMe: 'getMe',
    }),
    ...mapActions('contents', {
      add: 'add'
    }),
    handleSubmit(e) {
      this.submitted = true;
      this.add(this.model);
    },
    permissionCheck(action, role) {
      return this.contentsPermissions[this.contentType][action].indexOf(role) > -1
    }
  }
};
</script>
