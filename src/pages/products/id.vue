<template>
    
    <Head>
        <title>{{safeGet(product, `translations.${$i18n.locale}.name`, "")}}</title>
    </Head>
    <div>
        <NavbarOne/>

        <div class="bg-[#F8F5F0] dark:bg-dark-secondary py-5 md:py-[30px]">
            <div class="container-fluid">
                <ul class="flex items-center gap-[10px] text-base md:text-lg leading-none font-normal text-title dark:text-white max-w-[1720px] mx-auto flex-wrap">
                    <li><router-link to="/">{{ $t("Home") }}</router-link></li>
                    <li>/</li>
                    <li><router-link to="/products">{{ $t("Products") }}</router-link></li>
                    <li>/</li>
                    <li class="text-primary">{{safeGet(product, `translations.${$i18n.locale}.name`, "")}}</li>
                </ul>
            </div>
        </div>

        <div class="s-py-50" data-aos="fade-up">
            
            <div class="container-fluid" v-if="product">
                <div class="max-w-[1720px] mx-auto flex justify-between gap-10 flex-col lg:flex-row">
                    <div  class="w-full lg:w-[58%]">
                        <div class="relative product-dtls-wrapper">
                            <button class="absolute top-5 left-0 p-2 bg-[#E13939] text-lg leading-none text-white font-medium z-50">{{ safeGet(product, `status.translations.${$i18n.locale}.name`, "") }}</button>
                            <div class="product-dtls-slider ">
                                <model-viewer
                                    v-if="activeImage == 0"
                                    :src="storageUrl(safeGet(product, 'images.glb', ''))"
                                    camera-controls
                                    exposure="1"
                                    shadow-intensity="1"
                                    style="width:100%;height:520px"
                                ></model-viewer>
                               
                                <div><img :src="storageUrl(safeGet(product, 'images.main', ''))" alt="product" :class="activeImage === 3 ? '' : 'hidden' "></div>
                                <div v-for="image, imageIndx in safeGet(product, 'images.extra', [])"><img :src="storageUrl(image)" alt="product" :class="activeImage === imageIndx + 1 ? '' : 'hidden' "></div>
                            </div>
                            <div class="product-dtls-nav">
                                <div><img :src="storageUrl(safeGet(product, 'images.main', ''))" @click="activeImage = 0" alt="product" class="mb-2"></div>
                                <div v-for="image, imageIndx in safeGet(product, 'images.extra', [])">
                                    <img :src="storageUrl(image)" alt="product" class="mb-2" @click="activeImage = imageIndx + 1">
                                </div>                                
                            </div>
                        </div>
                    </div>
                    <div class="lg:max-w-[635px] w-full">
                        <div class="pb-4 sm:pb-6 border-b border-bdr-clr dark:border-bdr-clr-drk">
                            <h2 class="font-semibold leading-none">
                            {{ safeGet(product, `translations.${$i18n.locale}.name`, "") }}
                            </h2>
                            <h6 class="mt-2 font-semibold italic leading-none">
                                {{ safeGet(product, `brand.translations.${$i18n.locale}.name`, "") }}, {{ safeGet(product, `brand.translations.${$i18n.locale}.address`, "") }}
                            </h6>

                            <p class="sm:text-lg mt-5 md:mt-7 line-clamp-3">
                                {{ safeGet(product, `translations.${$i18n.locale}.description`, "") }}
                            </p>
                        </div>
                       <div class="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up" data-aos-delay="300">
                            <div class="flex gap-x-12 gap-y-3 flex-wrap">
                                <!-- <h6 class="leading-none font-medium">SKU : CH_0015</h6> -->
                                <h6 class="leading-none font-medium">{{ $t("Category") }} : {{ safeGet(product, `category.translations.${$i18n.locale}.name`, '') }}</h6>
                            </div>
                            <div class="flex gap-x-12 lg:gap-x-24 gap-y-3 flex-wrap mt-5 sm:mt-10">
                                <div v-if="safeGet(detail, 'size', '')" class="flex gap-[10px] items-center">
                                    <h6 class="leading-none font-medium">{{ $t("Size") }} :</h6>
                                    <div class="flex gap-[10px]">
                                        {{ safeGet(detail, 'size', '') }}
                                    </div>
                                </div>
                                <div class="flex gap-[10px] items-center">
                                    <h6 class="leading-none font-medium">{{ $t("Color") }} :</h6>
                                    <div class="flex gap-[10px] items-center">
                                        <label v-for="color, index in    safeGet(product, `details.0.colors`, [])" :key="index" :title="safeGet(color, `translations.${$i18n.locale}.name`, '')">
                                            <input v-model="form.color" :value="color.code" class="appearance-none hidden" type="radio" name="color">
                                            <span class="flex rounded-full duration-300 p-1"
                                                :style=" form['color'] == safeGet(color,'code', null) ? `border: 1px solid  ${safeGet(color,'code','')}` : ''"
                                            >
                                                <span :class="`w-4 h-4 rounded-full flex`" :style="`background:${safeGet(color, 'code', '')}`"></span>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up" data-aos-delay="400">
                            <h4 class="font-medium leading-none">{{ $t("Tags") }} :</h4>
                            <div class="flex flex-wrap gap-[10px] md:gap-[15px] mt-5 md:mt-6">
                                <template v-for="(tag, index) in safeGet(product, `details.0.tags`, [])" :key="index">
                                    <router-link class="btn btn-theme-outline btn-xs" to="#" :data-text="safeGet(tag, `translations.${$i18n.locale}.name`, '')"><span>{{ safeGet(tag, `translations.${$i18n.locale}.name`, '') }}</span></router-link>
                                </template>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>

        <div class="s-py-50">
            <DetailTab :description="safeGet(product, `translations.${$i18n.locale}.description`)"/>
        </div>

       

        <FooterOne/>

        <ScrollToTop/>

    </div>
</template>

<script setup>
    import { ref, computed, watch,onMounted } from 'vue';
    import { useRoute } from 'vue-router';

    import NavbarOne from '@/components/navbar/navbar-one.vue';
    import DetailTab from '@/components/product/detail-tab.vue';
    import FooterOne from '@/components/footer/footer-one.vue';
    import ScrollToTop from '@/components/scroll-to-top.vue';

    import Aos from 'aos';
    import { useProductStore } from '@/stores/productStore';
    import { safeGet } from '@/core/helpers/utilFunctions';
    import { storageUrl } from '@/core/helpers/envGetters';
    const form = ref({
        color: ""
    });
    const productStore = useProductStore();
    const product = ref(null);
    onMounted(()=>{
        getData();
        Aos.init()
    })
    
    const paramsId = computed(() => route.params.id)
    const getData = () => {
        productStore.getProduct(paramsId.value).then(res => {
            product.value = res;
        });
    }

    const detail = computed(() => {
        return safeGet(product.value, 'details.0', null);
    });

    const activeImage = ref(0)

   

   
    const route = useRoute()

</script>
