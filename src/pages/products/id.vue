<template>
    <div>
        <NavbarOne/>

        <div class="bg-[#F8F5F0] dark:bg-dark-secondary py-5 md:py-[30px]">
            <div class="container-fluid">
                <ul class="flex items-center gap-[10px] text-base md:text-lg leading-none font-normal text-title dark:text-white max-w-[1720px] mx-auto flex-wrap">
                    <li><router-link to="/">Home</router-link></li>
                    <li>/</li>
                    <li><router-link to="/shop-v1">Shop</router-link></li>
                    <li>/</li>
                    <li class="text-primary">{{data && data.name ? data.name : 'Classic Relaxable Chair'}}</li>
                </ul>
            </div>
        </div>

        <div class="s-py-50" data-aos="fade-up">
            
            <!-- height="600px" -->
            <div class="container-fluid" v-if="product">
                <div class="max-w-[1720px] mx-auto flex justify-between gap-10 flex-col lg:flex-row">
                    <div  class="w-full lg:w-[58%]">
                        <div class="relative product-dtls-wrapper">
                            <button class="absolute top-5 left-0 p-2 bg-[#E13939] text-lg leading-none text-white font-medium z-50">{{ safeGet(product, `status.translations.${$i18n.locale}.name`, "") }}</button>
                            <div class="product-dtls-slider ">
                                <!-- {{ safeGet(product, 'images.glb') }}
                                {{ storageUrl(safeGet(product, 'images.glb', '')) }} -->
                                <model-viewer
                                    :src="storageUrl(safeGet(product, 'images.glb', ''))"
                                    camera-controls
                                    exposure="1"
                                    shadow-intensity="1"
                                    style="width:100%;height:520px"
                                ></model-viewer>
                               
                                <!-- <div><img :src="data && data.image ? data.image : product1" alt="product" class="w-full" :class="activeImage === 1 ? '' : 'hidden' "></div> -->
                                <!-- {{ storageUrl(safeGet(product, 'images.main', '')) }} -->
                                <div><img :src="storageUrl(safeGet(product, 'images.main', ''))" alt="product" :class="activeImage === 3 ? '' : 'hidden' "></div>
                                <div v-for="image, imageIndx in safeGet(product, 'images.extra', [])"><img :src="storageUrl(image)" alt="product" :class="activeImage === imageIndx + 1 ? '' : 'hidden' "></div>
                                <!-- <div><img :src="product3" alt="product" :class="activeImage === 3 ? '' : 'hidden' "></div>
                                <div><img :src="product4" alt="product" :class="activeImage === 4 ? '' : 'hidden' "></div> -->
                            </div>
                            <div class="product-dtls-nav">
                                <div><img :src="storageUrl(safeGet(product, 'images.main', ''))" @click="activeImage = 0" alt="product" class="mb-2"></div>
                                <!--  :class="activeImage === 3 ? '' : 'hidden' " -->
                                <div v-for="image, imageIndx in safeGet(product, 'images.extra', [])">
                                    <img :src="storageUrl(image)" alt="product" class="mb-2" @click="activeImage = imageIndx + 1">
                                </div>
                                
                                <!-- <div><img :src="data && data.image ? data.image : product1" @click="activeImage = 1" alt="product" class="mb-2"></div>
                                <div><img :src="product2" @click="activeImage = 2" alt="product" class="mb-2"></div>
                                <div><img :src="product3" @click="activeImage = 3" alt="product" class="mb-2"></div>
                                <div><img :src="product4" @click="activeImage = 4" alt="product" class="mb-2"></div> -->
                            </div>
                        </div>
                    </div>
                    <div class="lg:max-w-[635px] w-full">
                        <div class="pb-4 sm:pb-6 border-b border-bdr-clr dark:border-bdr-clr-drk">
                            <h2 class="font-semibold leading-none">
                            {{ safeGet(product, `translations.${$i18n.locale}.name`, "") }}
                            </h2>
                            <h6 class="mt-2 font-semibold italic leading-none">
                                {{ safeGet(product, `brand.translations.${$i18n.locale}.name`, "") }}, made in {{ safeGet(product, `brand.translations.${$i18n.locale}.address`, "") }}
                            </h6>

                            <p class="sm:text-lg mt-5 md:mt-7 line-clamp-3">
                                {{ safeGet(product, `translations.${$i18n.locale}.description`, "") }}
                            </p>
                        </div>
                        <!-- <div class="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up" data-aos-delay="200">

                            <IncDec/>

                            <div class="flex gap-4 mt-4 sm:mt-6">
                                <router-link to="/cart" class="btn btn-solid" data-text="Add to Cart">
                                    <span>Add to Cart</span>
                                </router-link>
                                <router-link to="#" class="btn btn-outline" data-text="Add to Wishlist">
                                    <span>Add to Wishlist</span>
                                </router-link>
                            </div>
                        </div> -->
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
                                        <!-- {{ detail }} -->
                                    </div>
                                </div>
                                <div class="flex gap-[10px] items-center">
                                    <h6 class="leading-none font-medium">{{ $t("Color") }} :</h6>
                                    <div class="flex gap-[10px] items-center">
                                        <!-- {{ form.color }} -->
                                        <label v-for="color, index in    safeGet(product, `details.0.colors`, [])" :key="index" :title="safeGet(color, `translations.${$i18n.locale}.name`, '')">
                                            <input v-model="form.color" :value="color.code" class="appearance-none hidden" type="radio" name="color">
                                            <!-- {{ color }} -->
                                            <!-- {{ safeGet(color, 'code', '') }} -->
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
                            <h4 class="font-medium leading-none">Tags :</h4>
                            <div class="flex flex-wrap gap-[10px] md:gap-[15px] mt-5 md:mt-6">
                                <router-link class="btn btn-theme-outline btn-xs" to="#" data-text="Chair"><span>Chair</span></router-link>
                                <router-link class="btn btn-theme-outline btn-xs" to="#" data-text="Art & Paint"><span>Art & Paint</span></router-link>
                                <router-link class="btn btn-theme-outline btn-xs" to="#" data-text="Mirror"><span>Mirror</span></router-link>
                                <router-link class="btn btn-theme-outline btn-xs" to="#" data-text="Table"><span>Table</span></router-link>
                                <router-link class="btn btn-theme-outline btn-xs" to="#" data-text="Lamp"><span>Lamp</span></router-link>
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
    // import { vue3dLoader } from "vue-3d-loader"; // The vue3dLoader in {...}

    import NavbarOne from '@/components/navbar/navbar-one.vue';
    import IncDec from '@/components/inc-dec.vue';
    import DetailTab from '@/components/product/detail-tab.vue';
    import LayoutOne from '@/components/product/layout-one.vue';
    import FooterOne from '@/components/footer/footer-one.vue';
    import ScrollToTop from '@/components/scroll-to-top.vue';

    // import glbFile from '@/assets/img/123.glb'
    import Aos from 'aos';
    import { productList } from '@/data/data';
import { useProductStore } from '@/stores/productStore';
import { safeGet } from '@/core/helpers/utilFunctions';
import GLBViewer from '@/components/GLBViewer.vue';
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

    const now = ref(new Date().getTime())


    const targetTime = ref(new Date("Sep 13 2025").getTime())

    const difference = ref(0)

  const bgColor = computed(() => {
    return (clr) => `bg-[${clr}]`;
  })
    watch(now, () => {
        difference.value = targetTime.value - now.value
    })

    function updateNow() {
        now.value = new Date().getTime()
    }

    updateNow()
    setInterval(updateNow, 1000)

    const route = useRoute()

    const data = productList.find((item)=>item.id === parseInt(route.params.id))
</script>
