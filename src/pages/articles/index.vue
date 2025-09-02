<template>
    <NavbarOne/>
    <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" :style="{backgroundImage:'url('+ bg +')'}">
            <div class="text-center w-full">
                <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">{{ $t("Articles") }}</h2>
                <ul class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><router-link to="/">{{ $t("Home") }}</router-link></li>
                    <li>/</li>
                    <li class="text-primary">{{ $t("Articles") }}</li>
                </ul>
            </div>
        </div>
  <section class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Sarlavha + qidirish -->
    <!-- Tagma-tag ro‘yxat (accordion) -->
    <div class="space-y-5">
      <article
        v-for="a in articleStore.articles ?? []"
        :key="a.id"
        class="group rounded-2xl border border-gray-100/80 cursor-pointer bg-white/90 shadow-sm hover:shadow-md transition"
        data-aos="fade-up"
        @click="$router.push(`/articles/${a.id}`)"
      >
        <!-- Sarlavha qatori -->
        <button
          type="button"
          class="w-full text-left p-5 flex flex-row gap-3"
        >
          <div class="flex items-baseline gap-2 text-xs">
            <!-- <span class="inline-flex px-2 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700/70 text-gray-700 dark:text-gray-200">
             {{ safeGet(a, `translations.${$i18n.locale}.title`)}}
            </span> -->
            <span class="text-gray-400" v-if="a.date">·</span>
            <time v-if="a.date" class="text-gray-500 ">{{ formatDate(a.date) }}</time>
          </div>
          <div>
              <h2 class="text-base sm:text-lg font-medium leading-snug group-hover:opacity-90">
                {{ safeGet(a, `translations.${$i18n.locale}.title`)}}
              </h2>

          </div>

          <!-- Qisqa izoh (faqat yopiq holatda) -->
         

          <!-- Chevrondagi animatsiya -->
          
        </button>

        <!-- Ochilgan panel -->
        <div class="px-5 pb-5 -mt-2">
        <transition name="collapse">
            <div
              class="prose prose-sm max-w-full prose-img:rounded-xl prose-a:underline-offset-4 line-clamp-3"
              v-html="tr(a).text"
            />
        </transition>
        <p class="text-sm mt-5 text-gray-500 text-right">{{ safeGet(a, `translations.${$i18n.locale}.author`) }}</p>
    </div>
      </article>
    </div>
  </section>
  <FooterOne/>
  <ScrollToTop/>
</template>

<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import 'aos/dist/aos.css'
import NavbarOne from '@/components/navbar/navbar-one.vue'
import FooterOne from '@/components/footer/footer-one.vue'
import ScrollToTop from '@/components/scroll-to-top.vue'
import { useArticleStore } from '@/stores/articleStore'
import { safeGet } from '@/core/helpers/utilFunctions' 
     import bg from '@/assets/img/shortcode/breadcumb.jpg'

const { locale } = useI18n()
const tr = (a) => {
  const loc = String(locale.value)
  return (a && a.translations && (a.translations[loc] || a.translations.uz || Object.values(a.translations)[0])) || { title: '', text: '', author: '' }
}

const articleStore = useArticleStore();
const getData = () => {
    articleStore.getArticles();
}

onMounted(() => {
    getData();
});

/* Accordion holati */

const formatDate = (iso) => {
  if (!iso) return ''
  const d = new Date(iso)
  if (isNaN(d)) return iso
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
}

/* AOS */
onMounted(() => {
  AOS.init({ duration: 600, easing: 'ease-out', once: true })
  AOS.refresh()
})
</script>

<style scoped>
/* Accordion animatsiyasi */
.collapse-enter-from,
.collapse-leave-to { max-height: 0; opacity: 0; }
.collapse-enter-to,
.collapse-leave-from { max-height: 1200px; opacity: 1; }
.collapse-enter-active,
.collapse-leave-active { transition: max-height 300ms ease, opacity 300ms ease; }
</style>
