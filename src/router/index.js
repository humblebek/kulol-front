import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import('@/pages/index.vue')
    },
    {
      path: "/products/:id",
      name: "product-id",
      component: () =>import("@/pages/products/id.vue")
    }
  ],
})

export default router
