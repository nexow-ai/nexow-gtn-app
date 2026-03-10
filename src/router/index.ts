import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Nexow GTN' },
  },
  {
    path: '/onboard',
    name: 'Onboard',
    component: () => import('@/views/OnboardView.vue'),
    meta: { title: 'Create Account' },
  },
  {
    path: '/onboard/success',
    name: 'OnboardSuccess',
    component: () => import('@/views/OnboardSuccessView.vue'),
    meta: { title: 'Account Created' },
  },
]
