import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../views/home/HomePage'
import LoginPage from '../views/login/LoginPage'
import RegisterPage from '../views/register/RegisterPage'
import ListUsersPage from '../views/user/List'
import AddUserPage from '../views/user/AddPage'
import UpdateUserPage from '../views/user/UpdatePage'
import AddContentPage from '../views/content/AddPage'
import ListContentPage from '../views/content/List'
import UploadPage from '../views/upload/Upload'
import ListUploadPage from '../views/upload/List'
import DashPage from '../views/dash/Dash'
import GetRecoveryToken from '../views/passwordRecovery/GetToken'
import RecoveryPassword from '../views/passwordRecovery/Recovery'

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: HomePage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/users/list', component: ListUsersPage },
    { path: '/users/add', component: AddUserPage },
    { path: '/users/update', component: UpdateUserPage },
    { path: '/contents/add', component: AddContentPage },
    { path: '/contents', component: ListContentPage },
    { path: '/uploads/add', component: UploadPage },
    { path: '/uploads', component: ListUploadPage },
    { path: '/dash', component: DashPage },
    { path: '/get-recovery-token', component: GetRecoveryToken },
    { path: '/recovery-password', component: RecoveryPassword },

    // otherwise redirect to home
    { path: '*', redirect: '/' }
  ]
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/', '/login', '/register', '/get-recovery-token', '/recovery-password'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})
