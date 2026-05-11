import { createRouter, createWebHistory } from 'vue-router'
import { useGameStore } from '@/stores/game'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/start',
      name: 'start',
      component: () => import('../pages/Start.vue'),
    },
    {
      path: '/intro',
      name: 'intro',
      component: () => import('../pages/Intro.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue'),
    },
    {
      path: '/camera',
      name: 'camera',
      component: () => import('../pages/Camera.vue'),
    },
    {
      path: '/bagno-rosa',
      name: 'bagno-rosa',
      component: () => import('../pages/BagnoRosa.vue'),
    },
    {
      path: '/studio',
      name: 'studio',
      component: () => import('../pages/Studio.vue'),
    },
    {
      path: '/camera-vestiti',
      name: 'camera-vestiti',
      component: () => import('../pages/CameraVestiti.vue'),
    },
    {
      path: '/salotto',
      name: 'salotto',
      component: () => import('../pages/Salotto.vue'),
    },
    {
      path: '/bagno-gatti',
      name: 'bagno-gatti',
      component: () => import('../pages/BagnoGatti.vue'),
    },
    {
      path: '/cucina',
      name: 'cucina',
      component: () => import('../pages/Cucina.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const game = useGameStore()

  const roomNames = ['home', 'camera', 'bagno-rosa', 'studio', 'camera-vestiti', 'salotto', 'bagno-gatti', 'cucina']

  if (roomNames.includes(to.name as string) && !game.gameStarted) {
    return { name: 'start' }
  }

  if (to.name === 'start' && game.gameStarted) {
    return { name: 'home' }
  }
})

export default router
