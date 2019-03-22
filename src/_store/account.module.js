import { userService } from '../_services';

import { router } from '../_helpers';

const user = JSON.parse(localStorage.getItem('user'));
const state = user
  ? { status: { loggedIn: true }, user, gettingToken: {}, recoveringPassword: {} }
  : { status: {}, user: null, gettingToken: {}, recoveringPassword: {} };

const actions = {
  login({ dispatch, commit }, { email, password }) {
    commit('loginRequest', { email });

    userService.login(email, password)
      .then(
        loginResult => {
          commit('loginSuccess', loginResult);
          router.push('/dash');
        },
        error => {
          commit('loginFailure', error);
          dispatch('alert/error', error, { root: true });
        }
      );
  },
  logout({ commit, rootState }) {
    userService.logout();
    //console.log('rootState', rootState.users)
    // Pass root state too, to clear other state in other modules
    commit('logout', rootState);
  },
  register({ dispatch, commit }, user) {
    commit('registerRequest', user);

    userService.register(user)
      .then(
        user => {
          commit('registerSuccess', user);
          router.push('/login');
          setTimeout(() => {
            // display success message after route change completes
            dispatch('alert/success', 'Registration successful', { root: true });
          });
        },
        error => {
          commit('registerFailure', error);
          dispatch('alert/error', error, { root: true });
        }
      );
  },
  getRecoveryToken({ dispatch, commit }, { email }) {
    commit('getRecoveryTokenRequest', { email });

    userService.getRecoveryToken(email)
      .then(
        getRecoveryTokenResult => {
          commit('getRecoveryTokenSuccess', getRecoveryTokenResult);
          dispatch('alert/success', 'Token is sent, check you email!', { root: true });
        },
        error => {
          commit('getRecoveryTokenFailure', error);
          dispatch('alert/error', error, { root: true });
        }
      );
  },
  recoveryPassword({ dispatch, commit }, { password, token }) {
    commit('recoveryPasswordRequest');

    userService.recoveryPassword(password, token)
      .then(
        recoveryPasswordResult => {
          commit('recoveryPasswordSuccess', recoveryPasswordResult);
          dispatch('alert/success', 'Password changed!', { root: true });
        },
        error => {
          commit('recoveryPasswordFailure', error);
          dispatch('alert/error', error, { root: true });
        }
      );
  },
};

const mutations = {
  loginRequest(state, user) {
    state.status = { loggingIn: true };
    state.user = user;
  },
  loginSuccess(state, loginResult) {
    state.status = { loggedIn: true };
  },
  loginFailure(state, error) {
    state.status = { error };
  },
  logout(state, rootState) {
    state.status = {};
    // Clear all root state for users
    Object.keys(rootState.users).forEach(key => {
      rootState.users[key] = null;
    });
  },
  registerRequest(state, user) {
    state.status = { registering: true };
  },
  registerSuccess(state, user) {
    state.status = {};
  },
  registerFailure(state, error) {
    state.status = { error };
  },
  getRecoveryTokenRequest(state, email) {
    state.gettingToken = { loading: true };
    state.email = email;
  },
  getRecoveryTokenSuccess(state, loginResult) {
    state.gettingToken = {};
  },
  getRecoveryTokenFailure(state, error) {
    state.gettingToken = { error };
  },
  recoveryPasswordRequest(state) {
    state.recoveringPassword = { loading: true };
  },
  recoveryPasswordSuccess(state, loginResult) {
    state.recoveringPassword = {};
  },
  recoveryPasswordFailure(state, error) {
    state.recoveringPassword = { error };
  },
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
