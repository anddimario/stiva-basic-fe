<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <vue-form-generator
        :schema="schema"
        :model="model"
        :options="formOptions"
      />
      <div class="form-group">
        <button
          class="btn btn-primary"
          :disabled="status.loggingIn"
        >
          Login
        </button>
        <img
          v-show="status.loggingIn"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        >
        <router-link
          to="/register"
          class="btn btn-link"
        >
          Register
        </router-link><br>
        <router-link
          to="/get-recovery-token"
        >
          Recovery password
        </router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { LoginForm } from '../../forms/login';

export default {
  data () {
    return {
      model: LoginForm.model,
      schema: LoginForm.schema,
      formOptions: LoginForm.formOptions,
      submitted: false
    };
  },
  computed: {
    ...mapState('account', ['status']),
  },
  created () {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit (e) {
      this.submitted = true;
      if (this.model.email && this.model.password) {
        this.login(this.model);
      }
    }
  }
};
</script>
