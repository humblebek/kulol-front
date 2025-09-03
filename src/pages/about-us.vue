<template>
    <div>
        <NavbarOne/>

        <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" :style="{backgroundImage:'url(' + bg + ')'}">
            <div class="text-center w-full">
                <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">{{ $t("Team Member") }}</h2>
                <ul class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><router-link to="/">{{ $t("Home") }}</router-link></li>
                    <li>/</li>
                    <li class="text-primary">{{ $t("Team") }}</li>
                </ul>
            </div>
        </div>

        
  <BaseModel v-model="toggleSelectedDialog" @accept="onAccept" @decline="onDecline">
    <template #title>{{ safeGet(selectedItem, `translations.${$i18n.locale}.name`, '')}}</template>
     <section id="selected-item-desc" class="mb-4">
                <div class="flex gap-5 space-y-4">
                    <img class="w-56 object-cover " :src="storageUrl(safeGet(selectedItem, 'image', ''))" alt="team member">
                    <div>
                        <p><strong>{{ $t("Education Level") }}:</strong> {{safeGet(selectedItem, `translations.${$i18n.locale}.edu_level`, '')}}</p>
                        <p><strong>{{ $t("Languages") }}:</strong> {{safeGet(selectedItem, `translations.${$i18n.locale}.languages`, '')}}</p>
                        <p><strong>{{ $t("Biography") }}:</strong> {{safeGet(selectedItem, `translations.${$i18n.locale}.biography`, '')}}</p>
                        <h3 class="text-base font-semibold mb-2">{{ $t("Educations") }}:</h3>
                        <ul>
                            <li v-for="(education, index) in safeGet(selectedItem, 'educations', [])" :key="index">
                                {{ safeGet(education, `translations.${$i18n.locale}.text`, '') }}
                            </li>
                        </ul>
                        <h3 class="text-base font-semibold mb-2">{{ $t("Publications") }}:</h3>
                        <ul>
                            <li v-for="(education, index) in safeGet(selectedItem, 'publications', [])" :key="index">
                                {{ safeGet(education, 'id', '') }}
                                {{ safeGet(education, 'date', '') }}
                                {{ safeGet(education, 'page', '') }}
                                {{ safeGet(education, 'link', '') }}
                                {{ safeGet(education, `translations.${$i18n.locale}.conference_name`, '') }}
                            </li>
                        </ul>

                        <!-- {{ selectedItem }} -->
                    </div>
                </div>
            </section>
            <section>
            </section>
   
  </BaseModel>

        <!-- <DialogBase v-model="toggleSelectedDialog" :labelledby="'selected-item-title'" :describedby="'selected-item-desc'">
            <template #title>
                <h2 id="selected-item-title" class="text-lg font-semibold">{{ safeGet(selectedItem, `translations.${$i18n.locale}.name`, '')}}</h2>
            </template>
            <section id="selected-item-desc" class="mb-4">
                <div class="space-y-4">
                    <img class="w-full object-cover " :src="storageUrl(safeGet(selectedItem, 'image', ''))" alt="team member">
                    <p><strong>{{ $t("Education Level") }}:</strong> {{safeGet(selectedItem, `translations.${$i18n.locale}.edu_level`, '')}}</p>
                    <p><strong>{{ $t("Languages") }}:</strong> {{safeGet(selectedItem, `translations.${$i18n.locale}.languages`, '')}}</p>
                    <p><strong>{{ $t("Biography") }}:</strong> {{safeGet(selectedItem, `translations.${$i18n.locale}.biography`, '')}}</p>
                </div>
            </section>
            <section>
                <h3 class="text-md font-semibold mb-2">{{ $t("Educations") }}:</h3>
                <div v-for="(education, index) in safeGet(selectedItem, 'educations', [])" :key="index">
                    {{ safeGet(education, `translations.${$i18n.locale}.text`, '') }}
                </div>
            </section>
        </DialogBase> -->
        <div class="py-16">
            <div class="container-fluid">
                <div class="max-w-[1720px] mx-auto grid lg:grid-cols-2 gap-[30px]">
                    <template v-for="(item, index) in aboutUsStore.abouts" :key="index">
                        <div @click="selectItem(item)" class="group sm:grid sm:grid-cols-2 bg-[#F8F5F0] dark:bg-[#1E2A35]" data-aos="fade-up">
                            <div>
                                <img class="w-full object-cover " :src="storageUrl(item.image)" alt="team member">
                            </div>
                            <div class="sm:flex items-center justify-center px-5 py-[30px] order-2">
                                <div class="sm:max-w-[294px]">
                                    <!-- {{ safeGet(item, `translations.${$i18n.locale}`, '')}} -->
                                    <h4 class="font-semibold leading-none text-xl md:text-2xl duration-300 transition-all group-hover:text-primary"><router-link to="#">{{safeGet(item, `translations.${$i18n.locale}.name`, '')}}</router-link></h4>
                                    <span class="text-title dark:text-white-light leading-none mt-[10px] block">{{safeGet(item, `translations.${$i18n.locale}.edu_level`, '')}}</span>
                                    <p class="mt-[15px]">{{safeGet(item, `translations.${$i18n.locale}.languages`, '')}}</p>
    
                                    <div>
    
                                    </div>
                                    <div class="flex items-center gap-5 md:gap-6 mt-[15px]">
                                        <router-link to="#" class="hover:text-primary dark:hover:text-primary transition-all duration-300 text-paragraph dark:text-white">
                                            <i class="fa-brands fa-facebook-f"></i>
                                        </router-link>
                                        <router-link to="#" class="hover:text-primary dark:hover:text-primary transition-all duration-300 text-paragraph dark:text-white">
                                            <i class="fa-brands fa-twitter"></i>
                                        </router-link>
                                        <router-link to="#" class="hover:text-primary dark:hover:text-primary transition-all duration-300 text-paragraph dark:text-white">
                                            <i class="fa-brands fa-instagram"></i>
                                        </router-link>
                                        <router-link to="#" class="hover:text-primary dark:hover:text-primary transition-all duration-300 text-paragraph dark:text-white">
                                            <i class="fa-brands fa-linkedin-in"></i>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>

        <FooterOne/>        

        <ScrollToTop/>
    </div>
</template>

<script setup>
    import { onMounted, ref } from 'vue';
    import NavbarOne from '@/components/navbar/navbar-one.vue';
    import ScrollToTop from '@/components/scroll-to-top.vue';
    import FooterOne from '@/components/footer/footer-one.vue';

    import bg from '@/assets/img/bg/header.jpg'
    import Aos from 'aos';
import { useAboutStore } from '@/stores/aboutStore';
import { storageUrl } from '@/core/helpers/envGetters';
import { safeGet } from '@/core/helpers/utilFunctions';


    const aboutUsStore = useAboutStore();

    const getData = () => {
        aboutUsStore.getAbouts();
    }

    const selectedItem = ref(null);
    const toggleSelectedDialog = ref(false)
    const selectItem = (item) => {
        selectedItem.value = item;
        toggleSelectedDialog.value = true;
    }
    
    onMounted(()=>{
        Aos.init()
        getData();
    })

</script>
