<!-- eslint-disable vue/no-mutating-props -->
<template>
    
    <div class="flex items-center gap-4 sm:gap-6">
        <!-- <router-link to="/login" class="text-lg leading-none text-title dark:text-white transition-all duration-300 hover:text-primary hidden lg:block">Login</router-link> -->
        <!-- <button class="hdr_search_btn" aria-label="search">
            <i class="mdi mdi-magnify text-title dark:text-white text-[24px] sm:text-[28px]"></i>
        </button> -->

         <div class="main-menu absolute z-50 w-full lg:w-auto top-full left-0 lg:static bg-white dark:bg-title lg:bg-transparent lg:dark:bg-transparent px-5 sm:px-[30px] py-[10px] sm:py-5 lg:px-0 lg:py-0" :class="toggle ? 'active' : ''">
            <ul class="text-lg leading-none text-title dark:text-white lg:flex lg:gap-[30px]">
                
                <li class="relative">
                    <p to="#" class="mdi mdi-translate">{{ currentLang.lang }}<span></span></p>
                    <ul class="sub-menu lg:absolute z-50 lg:top-full lg:left-0 lg:min-w-[150px] lg:invisible lg:transition-all lg:bg-white lg:dark:bg-title lg:py-[15px] lg:pr-[30px]">
                        <li v-for="(langItem, index) in langItems" :key="index" class="cursor-pointer">
                            <a>
                                <p @click="setLanguage(langItem)">{{ langItem.lang }}</p>
                            </a>
                        </li>
                        
                    </ul>
                </li>
            </ul>
        </div>
        <button class="hamburger" :class="toggle ? 'opened' : ''" @click="handleToggle">
            <svg class="stroke-current text-title dark:text-white" width="40" viewBox="0 0 100 100">
                <path class="line line1" d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058" />
                <path class="line line2" d="M 20,50 H 80" />
                <path class="line line3" d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942" />
            </svg>
        </button>
    </div>
</template>

<script setup>
    import { ref, defineProps,defineEmits, computed  } from 'vue'
    
import { useI18n } from 'vue-i18n';
import { setItem } from '@/core/helpers/localeStorage';
import { DOCUMENT_DIRECTION, LANG_STORAGE_KEY } from '@/core/constants';
    // import { useI18n } from 'vue-i18n';
    const languageToggle = ref(false);
    const $i18n = useI18n();
    
    function setLanguage(langItem) {
        $i18n.locale.value = langItem.code; 
        document.dir = langItem.direction;
        setItem(LANG_STORAGE_KEY, langItem.code) 
        setItem(DOCUMENT_DIRECTION, langItem.direction)
        languageToggle.value = false;
    }

    const props = defineProps({
    toggle: Boolean,
    });

    const currentLang =  computed(() => {
        return langItems.find(item => item.code === $i18n.locale.value);
    })

    const langItems = [
        {
            lang: 'English',
            code: 'en',
            direction: "ltr",
            image: "https://flagcdn.com/w80/us.png"
        },
        {
            lang: "Русскый",
            code: 'ru',
            direction: "ltr",
            image: "https://flagcdn.com/w80/ru.png"

        },
        {
            lang: "Oʻzbekcha",
            code: 'uz',
            direction: "ltr",
            image: "https://flagcdn.com/w80/uz.png"

        },
        {
            lang: "Türkçe",
            code: 'tr',
            direction: "ltr",
            image: "https://flagcdn.com/w80/tr.png"

        },
        {
            lang: "中文",
            code: 'zh',
            direction: "ltr",
            image: "https://flagcdn.com/w80/cn.png"

        },
        {
            lang: "한국어",
            code: 'ko',
            direction: "ltr",
            image: "https://flagcdn.com/w80/kr.png"

        },
        {
            lang: "日本語",
            code: 'ja',
            direction: "ltr",
            image: "https://flagcdn.com/w80/jp.png"

        },
        {
            lang: "العربية",
            code: 'ar',
            direction:"rtl",
            image: "https://flagcdn.com/w80/ar.png"

        },
        {
            lang: "فارسی",
            code: 'fa',
            direction: "rtl",
            image: "https://flagcdn.com/w80/ir.png"

        },
        {
            lang: "Malay",
            code: "ms",
            direction:  "ltr",
            image: "https://flagcdn.com/w80/ms.png"

        },
        
]
    const emit = defineEmits(['toggle-change']);
     function handleToggle() {
        emit('toggle-change', !props.toggle); // Correctly use `toggle` prop here
    }

</script>