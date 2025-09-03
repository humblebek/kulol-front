<template>
    <NavbarOne/>
     <div class="bg-[#F8F5F0] py-5 md:py-[30px]">
            <div class="container-fluid">
                <ul class="flex items-center gap-[10px] text-base md:text-lg leading-none font-normal text-title  max-w-[1720px] mx-auto flex-wrap">
                    <li><router-link to="/">{{ $t("Home") }}</router-link></li>
                    <li>/</li>
                    <li><router-link to="/articles">{{ $t("Articles") }}</router-link></li>
                    <li>/</li>
                    <li class="text-primary capitalize">{{safeGet(article, `translations.${$i18n.locale}.title`, "")}}</li>
                </ul>
            </div>
        </div>
  <section class="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Sarlavha + qidirish -->
    <header class="mb-8 text-center gap-4">
      <div>
        <h1 class="text-2xl sm:text-3xl font-semibold tracking-tight">  {{ safeGet(article, `translations.${$i18n.locale}.title`)}}</h1>
      </div>

    
    </header>

    <!-- Tagma-tag ro‘yxat (accordion) -->
    <div class="space-y-5">
      <article 
        v-if="article"
        class="group rounded-2xl bg-white/90 shadow-sm hover:shadow-md transition"
        data-aos="fade-up"
      >
        <transition name="collapse">
          <div class="px-5 pb-5 -mt-2">
            <div
              class="prose prose-sm max-w-full  prose-img:rounded-xl prose-a:underline-offset-4"
              v-html="safeGet(article, `translations.${$i18n.locale}.text`)"
            />
          </div>
        </transition>
        <p class="text-sm text-gray-500 text-right ">{{ safeGet(article, `translations.${$i18n.locale}.author`) }}</p>
      </article>
      
    </div>
  </section>
  <FooterOne/>
  <ScrollToTop/>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AOS from 'aos'
import 'aos/dist/aos.css'
import NavbarOne from '@/components/navbar/navbar-one.vue'
import FooterOne from '@/components/footer/footer-one.vue'
import ScrollToTop from '@/components/scroll-to-top.vue'
import { useArticleStore } from '@/stores/articleStore'
import { safeGet } from '@/core/helpers/utilFunctions'
import { useRoute } from 'vue-router'

const route = useRoute();
const article = ref(null);
const articleStore = useArticleStore();
const getData = () => {
    articleStore.getArticle(route.params.id).then(res => {
        article.value = res;
    });
}

onMounted(() => {
    getData();
});


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
