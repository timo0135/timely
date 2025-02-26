import {createRouter, createWebHistory} from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import SignUpView from '@/views/SignUpView.vue';
import SignInView from '@/views/SignInView.vue';
import SettingsProfileView from '@/views/SettingsProfileView.vue';
import SettingsProjectView from '@/views/SettingsProjectView.vue';
import SettingsActivityView from '@/views/SettingsActivityView.vue';
import SettingsProjectDetailsView from '@/views/SettingsProjectDetailsView.vue';
import {useAuthStore} from '@/stores/authentification.js';
import SettingsActivityDetailsView from "@/views/SettingsActivityDetailsView.vue";
import StatisticsView from "@/views/StatisticsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      redirect: '/home',
      beforeEnter: (to, from, next) => {
        const store = useAuthStore();
        if (!store.isAuthenticated) {
          next({name: 'signin'});
        } else {
          next();
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      beforeEnter: (to, from, next) => {
        const store = useAuthStore();
        if (!store.isAuthenticated) {
          next({name: 'signin'});
        } else {
          next();
        }
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: '/signin',
      name: 'signin',
      component: SignInView
    },
    {
      path: '/settings',
      name: 'settings',
      redirect: '/settings/profile',
      children: [
        {
          path: 'profile',
          name: 'settings.profile',
          component: SettingsProfileView,
          beforeEnter: (to, from, next) => {
            const store = useAuthStore();
            if (!store.isAuthenticated) {
              next({name: 'signin'});
            } else {
              next();
            }
          }
        },
        {
          path: 'projects',
          name: 'settings.projects',
          component: SettingsProjectView,
          beforeEnter: (to, from, next) => {
            const store = useAuthStore();
            if (!store.isAuthenticated) {
              next({name: 'signin'});
            } else {
              next();
            }
          }
        },
        {
          path: 'activities',
          name: 'settings.activities',
          component: SettingsActivityView,
          beforeEnter: (to, from, next) => {
            const store = useAuthStore();
            if (!store.isAuthenticated) {
              next({name: 'signin'});
            } else {
              next();
            }
          }
        }
      ]
    },
    {
      path: '/settings/projects/:id',
      name: 'projet',
      component: SettingsProjectDetailsView,
      beforeEnter: (to, from, next) => {
        const store = useAuthStore();
        if (!store.isAuthenticated) {
          next({name: 'signin'});
        } else {
          next();
        }
      }
    },
    {
      path: '/settings/activities/:id',
      name: 'activity',
      component: SettingsActivityDetailsView,
      beforeEnter: (to, from, next) => {
        const store = useAuthStore();
        if (!store.isAuthenticated) {
          next({name: 'signin'});
        } else {
          next();
        }
      }
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsView,
      beforeEnter: (to, from, next) => {
        const store = useAuthStore();
        if (!store.isAuthenticated) {
          next({name: 'signin'});
        } else {
          next();
        }
      }
    }
  ],
});

export default router;
