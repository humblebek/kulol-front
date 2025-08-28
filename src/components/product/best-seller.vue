<template>
    <div class="container">
        <div class="max-w-1366 mx-auto">
            <div class="flex items-center justify-between gap-5 flex-wrap mb-6 pb-4 md:pb-6 border-b border-bdr-clr dark:border-bdr-clr-drk">
                <h2 class="font-semibold leading-none text-2xl sm:text-3xl lg:text-4xl">Best Sellers</h2>

            </div>
            <div class="mt-5">
                <div class="grid lg:grid-cols-2 grid-cols-1 gap-5">
                    <div class="grid md:grid-cols-2 grid-cols-1 gap-5">
                        <div class="" v-for="(item, index) in safeGet(products, 'data', []).slice(0,4)" :key="index">
                            <div class="relative group z-[5] before:absolute card-gradient-overlay before:w-full before:h-full before:top-0 before:left-0 before:opacity-0 before:duration-300 before:z-[5] overflow-hidden hover:before:opacity-100 best-seller-pdct">
                                <img class="w-full aspect-square object-cover transform duration-300 group-hover:scale-110" :src="storageUrl(safeGet(item, 'images.main', null))" alt="product-card"/>
                                <div class="absolute z-10 top-0 left-0 w-full h-full items-start justify-end flex flex-col p-7">
                                    <div>
                                        <!-- <h4 class="text-lg font-medium leading-none text-white transition-all group-hover:duration-100 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">{{item.price}}</h4> -->
                                        <h6 class="sm:text-xl font-normal text-white transition-all group-hover:duration-300 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-lg mt-3 md:mt-[15px] !leading-[1.5]"><router-link :to="`/products/${item.id}`">{{safeGet(item, `translations.${$i18n.locale}.name`, "")}}</router-link></h6>
                                        <ul class="flex items-center gap-2 mt-1 transition-all group-hover:duration-500 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                            <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                            <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                            <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                            <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                            <li><i class="fa-solid fa-star text-slate-300 text-[14px]"></i></li>
                                            <!-- <li class="text-white">( 123 )</li> -->
                                        </ul>
                                        <div class="mt-4 sm:mt-5 flex gap-[10px] transition-all group-hover:duration-700 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                            <button class="w-9 lg:w-12 h-9 p-2 lg:h-12 flex items-center justify-center text-white  transition-all bg-white/20 duration-300 relative tooltip-icon quick-view">
                                                <i class="mdi mdi-eye-outline transition-all duration-300 text-white text-[24px]"></i>
                                                <span class="p-2 bg-white dark:bg-title text-xs text-title dark:text-white absolute -top-[60px] left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-[4px] opacity-0 invisible duration-300">Quick View
                                                    <span class="w-3 h-3 bg-white dark:bg-title absolute -bottom-[6px] left-1/2 transform -translate-x-1/2 rotate-45"></span>
                                                </span>                          
                                            </button>
                                            <router-link to="/cart" class="w-9 lg:w-12 h-9 p-2 lg:h-12 flex items-center justify-center text-white  transition-all bg-white/20 duration-300 relative tooltip-icon">
                                                <i class="mdi mdi-shopping-outline transition-all duration-300 text-white text-[24px]"></i>
                                                <span class="p-2 bg-white dark:bg-title text-xs text-title dark:text-white absolute -top-[60px] left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-[4px] opacity-0 invisible duration-300">Add to Cart
                                                    <span class="w-3 h-3 bg-white dark:bg-title absolute -bottom-[6px] left-1/2 transform -translate-x-1/2 rotate-45"></span>
                                                </span>
                                            </router-link>
                                            <button class="w-9 lg:w-12 h-9 p-2 lg:h-12 flex items-center justify-center text-white  transition-all bg-white/20 duration-300 relative tooltip-icon">
                                                <i class="mdi mdi-cards-heart-outline transition-all duration-300 text-white text-[24px]"></i>
                                                <span class="p-2 bg-white dark:bg-title text-xs text-title dark:text-white absolute -top-[60px] left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-[4px] opacity-0 invisible duration-300">Add to wishlist
                                                    <span class="w-3 h-3 bg-white dark:bg-title absolute -bottom-[6px] left-1/2 transform -translate-x-1/2 rotate-45"></span>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="grid grid-cols-1">
                        <div class="relative group z-[5] before:absolute card-gradient-overlay before:w-full before:h-full before:top-0 before:left-0 before:opacity-0 before:duration-300 before:z-[5] overflow-hidden hover:before:opacity-100 best-seller-pdct">
                            <img class="w-full aspect-square transform duration-300 group-hover:scale-110 h-full" :src="safeGet(fifthProduct, 'images.main', null)" alt="product-card"/>
                            <div class="absolute z-10 top-0 left-0 w-full h-full items-start justify-end flex flex-col p-7">
                                <div>
                                    <!-- <h4 class="text-lg font-medium leading-none text-white transition-all group-hover:duration-100 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">$120</h4> -->
                                    <h6 class="sm:text-xl font-normal text-white transition-all group-hover:duration-300 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-lg mt-3 md:mt-[15px] !leading-[1.5]"><router-link to="/product-details">{{safeGet(fifthProduct, `translations.${$i18n.locale}.name`, "")}}</router-link></h6>
                                    <ul class="flex items-center gap-2 mt-1 transition-all group-hover:duration-500 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                        <li><i class="fa-solid fa-star text-[#EE9818] text-[14px]"></i></li>
                                        <li><i class="fa-solid fa-star text-slate-300 text-[14px]"></i></li>
                                        <!-- <li class="text-white">( 123 )</li> -->
                                    </ul>
                                    <div class="mt-4 sm:mt-5 flex gap-[10px] transition-all group-hover:duration-700 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                                        <button class="w-9 lg:w-12 h-9 p-2 lg:h-12 flex items-center justify-center text-white  transition-all bg-white/20 duration-300 relative tooltip-icon quick-view">
                                            <i class="mdi mdi-eye-outline transition-all duration-300 text-white text-[24px]"></i>
                                            <span class="p-2 bg-white dark:bg-title text-xs text-title dark:text-white absolute -top-[60px] left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-[4px] opacity-0 invisible duration-300">Quick View
                                                <span class="w-3 h-3 bg-white dark:bg-title absolute -bottom-[6px] left-1/2 transform -translate-x-1/2 rotate-45"></span>
                                            </span>                          
                                        </button>
                                        <router-link to="/cart" class="w-9 lg:w-12 h-9 p-2 lg:h-12 flex items-center justify-center text-white  transition-all bg-white/20 duration-300 relative tooltip-icon">
                                            <i class="mdi mdi-shopping-outline transition-all duration-300 text-white text-[24px]"></i>
                                            <span class="p-2 bg-white dark:bg-title text-xs text-title dark:text-white absolute -top-[60px] left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-[4px] opacity-0 invisible duration-300">Add to Cart
                                                <span class="w-3 h-3 bg-white dark:bg-title absolute -bottom-[6px] left-1/2 transform -translate-x-1/2 rotate-45"></span>
                                            </span>
                                        </router-link>
                                        <button class="w-9 lg:w-12 h-9 p-2 lg:h-12 flex items-center justify-center text-white  transition-all bg-white/20 duration-300 relative tooltip-icon">
                                            <i class="mdi mdi-cards-heart-outline transition-all duration-300 text-white text-[24px]"></i>
                                            <span class="p-2 bg-white dark:bg-title text-xs text-title dark:text-white absolute -top-[60px] left-1/2 transform -translate-x-1/2 whitespace-nowrap rounded-[4px] opacity-0 invisible duration-300">Add to wishlist
                                                <span class="w-3 h-3 bg-white dark:bg-title absolute -bottom-[6px] left-1/2 transform -translate-x-1/2 rotate-45"></span>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed, watch } from 'vue';
    import product1 from '@/assets/img/home-v4/seller-02.jpg'
import { getProducts } from '@/api/productApi';
import { useCategoryStore } from '@/stores/categoryStore';
import { safeGet } from '@/core/helpers/utilFunctions';
import { storageUrl } from '@/core/helpers/envGetters';

    const products = ref({data:[], pagination: {
        total: 0,
        per_page: 12,
        current_page: 1
    }});
    const categoryStore = useCategoryStore();
    const secondCategoryId = computed(() => {
        return safeGet(categoryStore.categories, '1.id', null);
    })

    watch(() => secondCategoryId.value, (newVal) => {
        if (newVal) {
            getProductsData();
        }
    });

    const fifthProduct = computed(() => {
        return safeGet(products.value, 'data', [])[4] || null;
    })

      const getProductsData = () => {
        getProducts({
            category_id: secondCategoryId.value
        }).then(res=>{
            products.value.data = res.data;
            products.value.pagination = res.meta;

        })
    }

     onMounted(()=>{
        getProductsData();
    })
</script>
