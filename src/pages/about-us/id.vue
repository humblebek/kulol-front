<template>
     <Head>
        <title>{{ safeGet(user, `translations.${$i18n.locale}.name`, '') }}</title>
    </Head>
    <NavbarOne />
  <main class="min-h-screen bg-gray-50 dark:bg-gray-900 py-10">
    <div class="container mx-auto max-w-7xl px-4" v-if="user">
      <!-- Title -->
      <h1 class="text-center text-4xl md:text-5xl font-extrabold tracking-tight text-gray-800 dark:text-gray-100">
        {{ safeGet(user, `translations.${$i18n.locale}.name`, '') }}
      </h1>

      <div class="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left: Profile card -->
        <section
          class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 lg:col-span-1">
          <div class="flex flex-col items-center">
            <img
              :src="storageUrl(safeGet(user, 'about_image', ''))"
              alt="Profile photo"
              class="w-40 h-40 rounded-xl object-cover ring-1 ring-gray-200 dark:ring-gray-700"
            />
            <h2 class="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100 text-center">
              {{ safeGet(user, `translations.${$i18n.locale}.name`, '') }}
            </h2>
          </div>

          <dl class="mt-6 space-y-4">
            <div class="flex">
              <dt class="w-40 shrink-0 text-gray-500 dark:text-gray-400 font-medium">{{ $t("Academic degree") }}:</dt>
              <dd class="text-gray-800 dark:text-gray-100">        {{ safeGet(user, `translations.${$i18n.locale}.edu_level`, '') }}
                </dd>
            </div>
           
            <div class="flex">
              <dt class="w-40 shrink-0 text-gray-500 dark:text-gray-400 font-medium">{{ $t("Date of birth") }}:</dt>
              <dd class="text-gray-800 dark:text-gray-100">        {{ $d(safeGet(user, `birth_date`, '')) }}</dd>
            </div>
            <div>
              <dt class="text-gray-500 dark:text-gray-400 font-medium">{{ $t("Languages") }}:</dt>
              <dd class="mt-2 flex flex-wrap gap-2">
                <span
                  v-for="(lang, i) in  safeGet(user, `translations.${$i18n.locale}.languages`, '').split(',')"
                  :key="i"
                  class="inline-flex items-center rounded-full px-3 py-1 text-sm bg-[#BB976D20] text-[#BB976D] ring-1 ring-inset ring-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:ring-blue-800"
                >
                  {{ lang }}
                </span>
              </dd>
            </div>
          </dl>
        </section>

        <!-- Right: Education + Publications -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Education -->
          <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <header class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ $t("Education") }}</h3>
            </header>
            <div class="px-6 py-5">
              <ul class="space-y-4">
                <li v-for="(e, i) in safeGet(user, 'educations', [])" :key="i" class="flex items-start gap-3">
                    <!-- {{ e }} -->
                  <span class="mt-2 h-2 w-2 rounded-full bg-[#BB976D]"></span>
                  <p class="text-gray-700 dark:text-gray-200">
                    {{ safeGet(e, `translations.${$i18n.locale}.text`, '') }}
                  </p>
                </li>
              </ul>
            </div>
          </section>

          <!-- Publications -->
          <section class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700">
            <header class="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">{{ $t("Scientific publications") }}</h3>
            </header>

            <div class="divide-y divide-gray-200 dark:divide-gray-700">
              <article
                v-for="(pub, i) in safeGet(user, 'publications', [])"
                :key="i"
                class="px-6 py-5 flex gap-4"
              >
              <!-- {{ pub }} -->
                <img
                  :src="storageUrl(safeGet(pub, 'pub_image', ''))"
                  alt=""
                  class="w-24 h-28 rounded-md object-cover ring-1 ring-gray-200 dark:ring-gray-700 shrink-0"
                />
                <div class="min-w-0">
                  <h4 class="text-base md:text-lg font-semibold text-gray-900 dark:text-gray-100 hover:underline cursor-pointer">
                    {{ safeGet(pub, `translations.${$i18n.locale}.title`, '') }}
                  </h4>
                  <p class="text-sm italic text-gray-500 dark:text-gray-400 mt-1">
                    {{ safeGet(pub, `translations.${$i18n.locale}.conference_name`, '') }}
                  </p>

                  <div class="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <span class="inline-flex items-baseline gap-1">
                      <span class="w-4 h-4 mdi mdi-calendar"></span>: {{ safeGet(pub, 'date', '') }}
                    </span>
                    <span class="inline-flex items-baseline gap-1">

                        <span class="mdi mdi-book-open-page-variant w-4 h-4"></span>: {{ safeGet(pub, 'page', '') }}
                    </span>
                    <a
                      :href="safeGet(pub, 'link', '#')"
                      target="_blank"
                      class="inline-flex items-baseline gap-1 text-blue-600 hover:underline dark:text-blue-400"
                    >
                    <span class="mdi mdi-link-variant w-4 h-4">

                    </span>:
                      DOI
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </section>
        </div>
      </div>

    </div>
    
  </main>
  <FooterOne/>        
</template>

<script setup>
import NavbarOne from '@/components/navbar/navbar-one.vue';
import { useAboutStore } from '@/stores/aboutStore';
import { useRoute } from 'vue-router';
import { onMounted, computed, ref } from 'vue';
import { safeGet } from '@/core/helpers/utilFunctions';
import { storageUrl } from '@/core/helpers/envGetters';
import FooterOne from '@/components/footer/footer-one.vue';
const aboutStore = useAboutStore();
const route = useRoute();
const paramId = computed(() => route.params.id);

const user = ref(null);
const getData = () => {
    aboutStore.getAbout({about_id: paramId.value}).then(res => {
        user.value = res.data;
    });
}

onMounted(() => {
    getData()
})
/* Demo ma'lumotlar — keyinchalik API’dan to‘ldirishingiz mumkin */
const profile = {
  fullName: "Odilov Bobir Axmadjon o‘g‘li",
  photoUrl:
    "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=400&auto=format&fit=crop",
  degree: "Tarix fanlari bo‘yicha falsafa doktori, PhD",
  title: "dotsent",
  birthDate: "19.02.1984",
  languages: ["Ingliz tili", "rus tili", "turk tili"],
}

const education = [
  { year: "2007", text: "O‘zbekiston milliy universiteti (kunduzgi)" },
  { year: "2009", text: "O‘zbekiston milliy universiteti (magistratura)" },
  { year: "2019", text: "Toshkent davlat sharqshunoslik universiteti (doktorantura)" },
]

const publications = [
  {
    cover:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=300&auto=format&fit=crop",
    title:
      "Изучение Этнотуристического Потенциала Баясунского Района",
    subtitle:
      'International scientific and practical conference “The Silk Road: Cooperation through the prism of tourism”',
    year: "2024",
    pages: "518–521",
    doi: "https://doi.org/10.0000/example",
  },
  {
    cover:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=300&auto=format&fit=crop",
    title:
      "Некоторые комментарии о возможностях развития этнотуризма",
    subtitle:
      'International scientific and practical conference “The Silk Road: Cooperation through the prism of tourism”',
    year: "2024",
    pages: "507–510",
    doi: "https://doi.org/10.0000/example2",
  },
]
</script>

<!-- Oddiy inline SVG ikonlar (kutubxonasiz) -->
<script>
export default {
  components: {
    CalendarIcon: {
      props: { class: String },
      template:
        `<svg :class="class" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>`
    },
    PagesIcon: {
      props: { class: String },
      template:
        `<svg :class="class" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M14 2H6a2 2 0 0 0-2 2v16l4-2 4 2 4-2 4 2V8z"></path>
        </svg>`
    },
    LinkIcon: {
      props: { class: String },
      template:
        `<svg :class="class" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 1 0-7.07-7.07L11 4"></path>
          <path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 1 0 7.07 7.07L13 20"></path>
        </svg>`
    }
  }
}
</script>

<style>
/* optional: smoother card shadow on dark bg */
</style>
