<template>
    <Swiper 
        :modules="[Autoplay]" 
        :slides-per-view="6" 
        :autoplay="{ delay: 3000}"
        :loop="true"
        :breakpoints="{
            320: { slidesPerView: 1, spaceBetween: 10 },
            576: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 4, spaceBetween: 20 },
            1140: { slidesPerView: 6, spaceBetween: 20 },
        }"
        class="max-w-[1720px] mx-auto owl-carousel home-v1-partner-slider flex items-center">
        <swiper-slide v-for="(item, index) in partnerStore.brands ?? []" :key="index" class="flex items-center justify-center w-full" aria-label="partner logo">
            <!-- {{ item }} -->
            <img 
                :src="storageUrl(safeGet(item, 'image', ''))" class="block" 
                :alt="safeGet(item, `translations.${$i18n.locale}.name`, '')"
            >
            
            <h2 class="text-xl">{{ safeGet(item, `translations.${$i18n.locale}.name`, "") }}</h2>
            <!-- <img :src="item.image2" class="hidden dark:block" alt=""> -->
        </swiper-slide>
    </Swiper>
</template>

<script setup>

import { partnerData } from '@/data/data';

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import { usePartnerStore } from '@/stores/partnerStore';
import { safeGet } from '@/core/helpers/utilFunctions';
import { storageUrl } from '@/core/helpers/envGetters';


const partnerStore = usePartnerStore();

</script>
