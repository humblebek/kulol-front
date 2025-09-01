import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import('@/pages/index.vue')
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/pages/products/index.vue")
    },
    {
      path: "/products/:id",
      name: "product-id",
      component: () =>import("@/pages/products/id.vue")
    },
    {
      path: "/contact",
      name: "contact",
      component: () => import("@/pages/contact.vue")
    },
     {
      path: "/about-us",
      name: "about-us",
      component: () => import("@/pages/about-us/index.vue")
    },
     {
      path: "/about-us/:id",
      name: "about-us-id",
      component: () => import("@/pages/about-us/id.vue")
    },
    {
      path: "/media",
      name: "media",
      component: () => import("@/pages/media.vue")
    },
    {
      path: '/articles',
      name: "articles",
      component: () => import("@/pages/articles/index.vue")
    },
    {
      path: '/articles/:id',
      name: "article-id",
      component: () => import("@/pages/articles/id.vue")
    }
  ],
})

export default router
