<template>
  <div>
    <div v-if="me.userRole === 'admin'">
      <h2>Add User</h2>
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
      <p v-if="added.error">
        {{ added.error }}
      </p>
      <p v-if="added.done">
        User added
      </p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { userForms } from '../../forms/user';

export default {
  data() {
    return {
      model: userForms.add.model,
      schema: userForms.add.schema,
      formOptions: userForms.add.formOptions,
      submitted: false
    };
  },
  created() {
    this.getMe();
  },
  computed: {
    ...mapState({
      me: state => state.users.me,
      added: state => state.users.added
    })
  },
  methods: {
    ...mapActions('users', {
      getMe: 'getMe',
      add: 'add'
    }),
    handleSubmit(e) {
      this.submitted = true;
      this.add(this.model);
    }
  }
};
</script>
