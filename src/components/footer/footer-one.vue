<template>
   <div class="relative bg-overlay before:bg-title before:bg-opacity-80" :style="{backgroundImage:'url('+ bg +')'}">
       <div class="s-py-100-50 text-white">
        <div class="container">
            <div class="max-w-1366 mx-auto flex items-start gap-10 justify-between flex-col 2xl:flex-row">
                <div class="sm:mx-auto 2xl:mx-0 2xl:max-w-[245px] w-full sm:text-center 2xl:text-left">
                    <router-link class="cursor-pointer block" to="/" aria-label="Furnixar">
                        <img :src="logoDark" alt="" class='m-auto h-[60px] sm:h-[60px]'/>
                    </router-link>
                    <p class="mt-[15px]">{{$t("Artisan3D is a modern puppetry & craftsmanship platform dedicated to preserving tradition and inspiring creativity. Discover unique handmade designs, cultural heritage, and personalized art — all in one place.")}}</p>
                </div>
                <div class="hidden 2xl:block h-[121px] w-[1px] transform translate-y-6 border border-white border-dashed border-title dark:border-white"></div>
                <div class="2xl:max-w-[1057px] w-full grid text-white grid-cols-2 sm:grid-cols-3 lg:flex items-start justify-between gap-10">
                    <div>
                        <h4 class="leading-none text-white mb-5 md:mb-6 text-xl">{{ $t("Sitemap") }}</h4>
                        <ul class="text-title text-white dark:text-white  leading-none flex flex-col gap-4">
                            <li v-for="(item, index) in navItems" :key="index" class="duration-100 hover:text-primary inline-block group"><router-link class="text-underline-primary" :to="item.to">{{$t(item.text)}}</router-link></li>
                        </ul>
                    </div>
                    <div class="h-[121px] w-[1px] transform translate-y-6 border border-dashed border-title border-white dark:border-white hidden lg:block"></div>
                    <div>
                        <h4 class="text-white leading-none mb-5 md:mb-6 text-xl">{{ $t("Others") }}</h4>
                        <ul class="text-title text-white dark:text-white leading-none flex flex-col gap-4">
                            <li class="duration-100 hover:text-primary inline-block group"><a href="https://gov.uz/uz/innovation" target="_blank" class="gap-3 flex items-center" to="#">
                                <!-- <i class="mdi mdi-facebook  dark:text-white duration-300 group-hover:text-primary"></i>                                      -->
                                Innovatsion Agentlik
                            </a></li>
                            <li class="duration-100 hover:text-primary inline-block group"><a href="https://tsuos.uz/en/" target="_blank" class="gap-3 flex items-center" to="#">
                                <!-- <i class="mdi mdi-facebook  dark:text-white duration-300 group-hover:text-primary"></i>                                      -->
                                TSUOS
                            </a></li>
                            <li class="duration-100 text-white hover:text-primary inline-block group"><a href="https://etnotravel.uz/" target="_blank" class="gap-3 flex items-center" to="#">
                                <!-- <i class="mdi mdi-twitter  dark:text-white duration-300 group-hover:text-primary"></i>                       -->
                                Etnotravel
                            </a></li>
                        </ul>
                    </div>
                    <div class="h-[121px] w-[1px] transform translate-y-6 border border-dashed border-title border-white dark:border-white hidden lg:block"></div>
                    <div>
                        <h4 class="leading-none text-white mb-5 md:mb-6 text-xl">{{ $t("Social media") }}</h4>
                        <ul class="text-title text-white dark:text-white leading-none flex flex-col gap-4">
                            <li v-for="link, index in socialMediaLinks" :key="index" class="duration-100 hover:text-primary inline-block group"><a class="gap-3 flex items-center" :href="link.link" target="_blank">
                                <i :class="`${link.icon}  dark:text-white duration-300 group-hover:text-primary`"></i>                                     
                                {{ link.name }}
                            </a></li>
                           
                        </ul>
                    </div>
                    <div class="h-[121px] w-[1px] transform translate-y-6 border border-white border-dashed border-title dark:border-white hidden lg:block"></div>
                    <div >
                        <h4 class="leading-none text-white mb-5 md:mb-6 text-xl">{{ $t('Categories') }}</h4>
                        <ul class="text-title text-white dark:text-white leading-none flex flex-col gap-4">
                            <li v-for="(item, index) in (categoryStore.categories ?? []).slice(0, 5)" :key="index" class="duration-100 hover:text-primary inline-block group">
                                <router-link class="text-underline-primary" :to="`/products?category_id=${item.id}`">
                                    {{safeGet(item, `translations.${$i18n.locale}.name`, '')}}
                                </router-link></li>
                        </ul>
                    </div>
                </div> 
            </div>
            <p class="max-w-1366 mx-auto mt-12">© {{year}} Furnixar Develop with <i class="fa-solid fa-heart text-red-600"></i> by <a href="https://shreethemes.in/" target="_blank" className='ms-1'>Shreethemes</a></p>
        </div>
    </div>
    </div>
</template>

<script setup>
    import bg from '@/assets/img/bg/footer2.jpg'
    import { ref } from 'vue';
    import { useCategoryStore } from '@/stores/categoryStore';
    import { navItems } from '@/core/constants';
    import { safeGet } from '@/core/helpers/utilFunctions';

import logoDark from '@/assets/logo1.png'

    const categoryStore = useCategoryStore();
    const year = ref(new Date().getFullYear());

    const socialMediaLinks = ref([
    {   
        icon: "mdi mdi-facebook",
        name: "Facebook",
        link: "https://www.facebook.com/people/Etnotravel-Uzbekistan/61567360602125/?mibextid=ZbWKwL"
    },
    {
        icon: "mdi mdi-instagram",
        name: "Instagram",
        link: "https://www.instagram.com/etnotraveluzb"   
    },
    {
        icon: "ti ti-brand-telegram",
        name: "Telegram",
        link: "https://t.me/etnotravelUZB"
    },
    {
        icon: "mdi mdi-youtube",
        name: "Youtube",
        link: "youtube.com/@EtnotravelUzb"
    }
    ]);
</script>
