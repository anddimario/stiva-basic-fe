<template>
  <div>
    <nav>
      <router-link to="/">
        Home
      </router-link>
      <router-link
        v-if="status && status.loggedIn !== true"
        to="/register"
      >
        Register
      </router-link>
      <router-link
        v-if="status && status.loggedIn !== true"
        to="/login"
      >
        Login
      </router-link>
      <router-link
        v-if="me && me.userRole"
        to="/"
        @click.native="logout"
      >
        Logout
      </router-link>
    </nav>
    <div v-if="me && me.userRole && me.fullname">
      <h1>Hi {{ me.fullname }}!</h1>
      <em v-if="me.loading">Loading me...</em>
    </div>
    <ul v-if="me && me.userRole">
      <li v-if="me.userRole">
        <router-link to="/dash">
          Dashboard
        </router-link>
      </li>

      <li>
        USER
        <ul>
          <li v-if="me.userRole === 'admin'">
            <router-link to="/users/list">
              List
            </router-link>
          </li>
          <li v-if="me.userRole === 'admin'">
            <router-link to="/users/add">
              Add
            </router-link>
          </li>

          <li v-if="me.userRole">
            <router-link to="/users/update" class="user-update-button">
              Update
            </router-link>
          </li>
        </ul>
      </li>
      <li v-for="content in contentsAvailable">
        {{ content.toUpperCase() }}
        <ul>
          <li v-if="permissionCheck(content, 'creators', me.userRole)">
            <router-link :to="'/contents/' + content + '/add'">
              Add
            </router-link>
          </li>
          <li v-if="permissionCheck(content, 'viewers', me.userRole)">
            <router-link :to="'/contents/' + content">
              List
            </router-link>
          </li>
        </ul>
      </li>
      <li>
        FILES
        <ul>
          <li v-if="permissionCheck('upload', 'creators', me.userRole)">
            <router-link to="/uploads/add">
              Add
            </router-link>
          </li>
          <li v-if="permissionCheck('upload', 'viewers', me.userRole)">
            <router-link to="/uploads">
              List
            </router-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import config from 'config';

export default {
  data() {
    return {
      contentsAvailable: config.contents,
      contentsPermissions: config.permissions
    }
  },
  computed: {
    ...mapState({
      me: state => state.users.me,
      status: state => state.account.status,
    })
  },
  methods: {
    ...mapActions('account', {
      logout: 'logout',
    }),
    permissionCheck(content, action, role) {
      return this.contentsPermissions[content][action].indexOf(role) > -1
    }
  },
  watch: {
    me: function () {
      // Clear navigation data to remove item in menu
      if (!this.me) {
        Object.assign(this.$data, this.$options.data.apply(this))
      }
    }
  }
};
</script>
