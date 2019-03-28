<template>
  <div>
    <h2>Update User</h2>
    <div v-if="me.userRole === 'admin'">
      You are an admin, you can edit all user
    </div>
    <form @submit.prevent="updateUserSubmit">
      <vue-form-generator
        :schema="schemaUser"
        :model="modelUser"
        :options="formOptionsUser"
      />
      <div class="form-group">
        <button
          class="btn btn-primary"
          :disabled="updatedUser.loading"
        >
          Update
        </button>
        <img
          v-show="updatedUser.loading"
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
    <p v-if="updatedUser.error">
      {{ updatedUser.error }}
    </p>
    <p v-if="updatedUser.done">
      User updated
    </p>
    <h2>Update Password</h2>
    <form @submit.prevent="updatePasswordSubmit">
      <vue-form-generator
        :schema="schemaPassword"
        :model="modelPassword"
        :options="formOptionsPassword"
      />
      <div class="form-group">
        <button
          class="btn btn-primary"
          :disabled="updatedPassword.loading"
        >
          Update
        </button>
        <img
          v-show="updatedPassword.loading"
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
    <p v-if="updatedPassword.error">
      {{ updatedPassword.error }}
    </p>
    <p v-if="updatedPassword.done">
      Password updated
    </p>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { userForms } from '../../forms/user';

export default {
  data() {
    return {
      modelUser: {},
      schemaUser: {},
      formOptionsUser: userForms.updateUser.formOptions,
      modelPassword: {},
      schemaPassword: {},
      formOptionsPassword: userForms.updatePassword.formOptions,
      submitted: false
    };
  },
  created() {
    this.getMe();
  },
  computed: {
    ...mapState({
      me: state => state.users.me,
      updatedUser: state => state.users.updatedUser,
      updatedPassword: state => state.users.updatedPassword
    })
  },
  methods: {
    ...mapActions('users', {
      getMe: 'getMe',
      update: 'update',
      updatePassword: 'updatePassword'
    }),
    updatePasswordSubmit(e) {
      this.submitted = true;
      this.updatePassword(this.modelPassword);
    },
    updateUserSubmit(e) {
      this.submitted = true;
      this.update(this.modelUser);
    }
  },
  watch: {
    me: function () {
      // remove schema fields based on user role
      const schemaUser = userForms.updateUser.schema;
      const modelUser = userForms.updateUser.model;
      const schemaPassword = userForms.updatePassword.schema;
      const modelPassword = userForms.updatePassword.model;
      if (this.me && this.me.userRole) {
        if (this.me.userRole !== 'admin') {
          // update user form
          const adminUserFields = ['userRole'];
          for (const field of schemaUser.fields) {
            if (adminUserFields.includes(field.model)) {
              const position = schemaUser.fields.indexOf(field);
              schemaUser.fields.splice(position, 1);
              delete modelUser[field.model];
            }
          }
          // update password form
          const adminPasswordFields = ['email'];
          for (const field of schemaPassword.fields) {
            if (adminPasswordFields.includes(field.model)) {
              const position = schemaPassword.fields.indexOf(field);
              schemaPassword.fields.splice(position, 1);
              delete modelPassword[field.model];
            }
          }
        }
        this.schemaUser = schemaUser;
        this.modelUser = modelUser;
        this.schemaPassword = schemaPassword;
        this.modelPassword = modelPassword;
      }
    }
  }
};
</script>
