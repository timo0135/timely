import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import SignUpView from '../views/SignUpView.vue';
import SignInView from '../views/SignInView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/home'},
    {path: '/home', component: HomeView},
    {path: '/signup', component: SignUpView},
    {path: '/signin', component: SignInView},
  ],
});

export default router;
