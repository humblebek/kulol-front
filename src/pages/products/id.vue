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
                    <div class="w-full lg:w-[58%]">
                        <div class="relative product-dtls-wrapper">
                            <button class="absolute top-5 left-0 p-2 bg-[#E13939] text-lg leading-none text-white font-medium z-50">{{ safeGet(product, `status.translations.${$i18n.locale}.name`, "") }}</button>
                            <div class="product-dtls-slider ">
                                <!-- {{ safeGet(product, 'images.glb') }}
                                {{ storageUrl(safeGet(product, 'images.glb', '')) }} -->
                                <GLBViewer v-if="activeImage == 0" :src="storageUrl(safeGet(product, 'images.glb', ''))" height="500"/>
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

                            <p class="sm:text-lg mt-5 md:mt-7">
                                {{ safeGet(product, `translations.${$i18n.locale}.description`, "") }}
                            </p>
                        </div>
                        <div class="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up" data-aos-delay="200">

                            <IncDec/>

                            <div class="flex gap-4 mt-4 sm:mt-6">
                                <router-link to="/cart" class="btn btn-solid" data-text="Add to Cart">
                                    <span>Add to Cart</span>
                                </router-link>
                                <router-link to="#" class="btn btn-outline" data-text="Add to Wishlist">
                                    <span>Add to Wishlist</span>
                                </router-link>
                            </div>
                        </div>
                        <div class="py-4 sm:py-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up" data-aos-delay="300">
                            <div class="flex gap-x-12 gap-y-3 flex-wrap">
                                <h6 class="leading-none font-medium">SKU : CH_0015</h6>
                                <h6 class="leading-none font-medium">Category : Chair</h6>
                            </div>
                            <div class="flex gap-x-12 lg:gap-x-24 gap-y-3 flex-wrap mt-5 sm:mt-10">
                                <div class="flex gap-[10px] items-center">
                                    <h6 class="leading-none font-medium">Size :</h6>
                                    <div class="flex gap-[10px]">
                                        <label class="product-size">
                                            <input class="appearance-none hidden" type="radio" name="size" checked>
                                            <span class="w-6 h-6 flex items-center justify-center pt-[2px] text-sm leading-none bg-[#E8E9EA] dark:bg-dark-secondary text-title dark:text-white duration-300">S</span>
                                        </label>
                                        <label class="product-size">
                                            <input class="appearance-none hidden" type="radio" name="size" >
                                            <span class="w-6 h-6 flex items-center justify-center pt-[2px] text-sm leading-none bg-[#E8E9EA] dark:bg-dark-secondary text-title dark:text-white duration-300">M</span>
                                        </label>
                                        <label class="product-size">
                                            <input class="appearance-none hidden" type="radio" name="size">
                                            <span class="w-6 h-6 flex items-center justify-center pt-[2px] text-sm leading-none bg-[#E8E9EA] dark:bg-dark-secondary text-title dark:text-white duration-300">L</span>
                                        </label>
                                        <label class="product-size">
                                            <input class="appearance-none hidden" type="radio" name="size">
                                            <span class="w-6 h-6 flex items-center justify-center pt-[2px] text-sm leading-none bg-[#E8E9EA] dark:bg-dark-secondary text-title dark:text-white duration-300">XL</span>
                                        </label>
                                    </div>
                                </div>
                                <div class="flex gap-[10px] items-center">
                                    <h6 class="leading-none font-medium">{{ $t("Color") }} :</h6>
                                    <div class="flex gap-[10px] items-center">
                                        <label class="product-color" v-for="color, index in    safeGet(product, `details.0.colors`, [])" :key="index">
                                            <input class="appearance-none hidden" type="radio" name="color" >
                                            <!-- {{ color }} -->
                                            <!-- {{ safeGet(color, 'code', '') }} -->
                                            <span class="border border-[#D68553] flex rounded-full border-opacity-0 duration-300 p-1">
                                                <span :class="`w-4 h-4 rounded-full bg-[ ${bgColor(safeGet(color, 'code', '')) }] flex`"></span>
                                            </span>
                                        </label>
                                        <label class="product-color">
                                            <input class="appearance-none hidden" type="radio" name="color" checked>
                                            <span class="border border-[#61646E] flex rounded-full border-opacity-0 duration-300 p-1">
                                                <span class="w-4 h-4 rounded-full bg-[#61646E] flex"></span>
                                            </span>
                                        </label>
                                        <label class="product-color">
                                            <input class="appearance-none hidden" type="radio" name="color">
                                            <span class="border border-[#E9E3DC] flex rounded-full border-opacity-0 duration-300 p-1">
                                                <span class="w-4 h-4 rounded-full bg-[#E9E3DC] flex"></span>
                                            </span>
                                        </label>
                                        <label class="product-color">
                                            <input class="appearance-none hidden" type="radio" name="color">
                                            <span class="border border-[#9A9088] flex rounded-full border-opacity-0 duration-300 p-1">
                                                <span class="w-4 h-4 rounded-full bg-[#9A9088] flex"></span>
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
                        <div class="pt-4 sm:pt-6" data-aos="fade-up" data-aos-delay="500">
                            <div class="flex items-center gap-6">
                                <h6 class="font-normal">Share : </h6>
                                <div class="flex gap-6">
                                    <router-link to="#" class="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                        <i class="fa-brands fa-facebook-f"></i>
                                    </router-link>
                                    <router-link to="#" class="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                        <i class="fa-brands fa-twitter"></i>
                                    </router-link>
                                    <router-link to="#" class="text-paragraph duration-300 dark:text-white hover:text-primary dark:hover:text-primary">
                                        <i class="fa-brands fa-instagram"></i>
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="s-py-50">
            <DetailTab/>
        </div>

        <div class="s-py-50-100">
            <div class="container-fluid">
                <div class="max-w-[547px] mx-auto text-center">
                    <h6 class="text-2xl sm:text-3xl md:text-4xl leading-none">Related Products</h6>
                    <p class="mt-3">Explore complementary options that enhance your experience. Discover related products curated just for you. </p>
                </div>
                <LayoutOne :classList="'max-w-[1720px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-8 pt-8 md:pt-[50px]'" :productList="productList.slice(0,4)"/>
            </div>
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

    import product1 from '@/assets/img/gallery/product-detls/product-01.jpg'
    import product2 from '@/assets/img/gallery/product-detls/product-02.jpg'
    import product3 from '@/assets/img/gallery/product-detls/product-03.jpg'
    import product4 from '@/assets/img/gallery/product-detls/product-04.jpg'
    // import glbFile from '@/assets/img/123.glb'
    import Aos from 'aos';
    import { productList } from '@/data/data';
import { useProductStore } from '@/stores/productStore';
import { safeGet } from '@/core/helpers/utilFunctions';
import GLBViewer from '@/components/GLBViewer.vue';
import { storageUrl } from '@/core/helpers/envGetters';

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
