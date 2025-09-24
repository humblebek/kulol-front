<template>
    <Head>
        <title>{{ $t("Home") }}</title>
    </Head>
    <div>
        <NavbarOne/>

        <div class="pt-40 sm:pt-52 lg:pt-[280px] pb-52 lg:pb-[350px] 2xl:pb-[450px] bg-overlay before:bg-title before:bg-black before:opacity-10" :style="{backgroundImage:'url(' + bg  + ')'}">
            <div class="container">
                <div class="max-w-[751px] mx-auto">
                    <h2 class="text-3xl sm:text-5xl md:text-6xl leading-snug sm:leading-snug md:leading-snug lg:leading-snug " data-aos="fade-up">{{$t("Unique Handmade Designs for a Modern World")}} <span class="font-secondary text-primary font-normal">Artisan3d</span></h2>
                  
                </div>
            </div>
        </div>
<!-- {{ categoryStore.categories }} -->
        <div class="container">
            <div class="max-w-1366 mx-auto">
                <div class="hv3-service-wrapper bg-white dark:bg-title rounded-[10px] -mt-16 relative z-10 xl:flex xl:justify-between sm:gap-5 grid sm:grid-cols-2">
                      <div v-for="(category, index) in (categoryStore.categories ?? []).slice(0, 5)" :key="index" class="relative">
                        <router-link :to="`/products?category_id=${category.id}`" class="group flex items-center gap-5 p-6">
                            <div class="w-14 md:w-[70px] h-14 p-[10px] md:h-[70px] flex items-center justify-center border border-primary rounded-[10px] group-hover:bg-primary duration-300">
                                <div class="block group-hover:hidden">
                                    <!-- {{ item }} -->
                                    <img class="w-full aspect-square" :src="storageUrl(safeGet(category, 'icon', ''))" alt=""/>                           
                                </div>
                                <div class="hidden group-hover:block">
                                    <img class="w-full aspect-square" :src="storageUrl(safeGet(category, 'icon', ''))" alt=""/>                           
                                </div>
                            </div>
                            <div>
                                <h5 class="font-medium leading-none text-lg lg:text-xl">{{safeGet(category, `translations.${$i18n.locale}.name`, '')}}</h5>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="s-py-100">
            <div class="container">
                <div class="max-w-1366 mx-auto">
                    <div class="flex items-center justify-between gap-5 flex-wrap mb-6 pb-4 md:pb-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up">
                        <h2 class="font-semibold leading-none text-2xl sm:text-3xl lg:text-4xl">{{safeGet(firstCategory, `translations.${$i18n.locale}.name`, "")}}</h2>
                        <router-link to="/products" class="group flex items-center gap-[10px] font-medium md:text-lg leading-none text-title dark:text-white">
                            <span class="text-underline leading-none">{{ $t("See All Collection") }}</span>
                            <svg class="w-5 md:w-[30px] fill-current text-title dark:text-white" viewBox="0 0 31 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M30.5311 6.43072C30.824 6.13783 30.824 5.66295 30.5311 5.37006L25.7581 0.59709C25.4653 0.304196 24.9904 0.304196 24.6975 0.59709C24.4046 0.889983 24.4046 1.36486 24.6975 1.65775L28.9401 5.90039L24.6975 10.143C24.4046 10.4359 24.4046 10.9108 24.6975 11.2037C24.9904 11.4966 25.4653 11.4966 25.7581 11.2037L30.5311 6.43072ZM0.300781 6.65039L30.0008 6.65039V5.15039L0.300781 5.15039L0.300781 6.65039Z"/>
                            </svg>                        
                        </router-link>
                    </div>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8" data-aos="fade-up" data-aos-delay="100">
                        <div v-for="(item, index) in (productStore.products ?? []).slice(0, 4)" :key="index" class="group">
                            <div class="relative overflow-hidden before:absolute card-gradient-overlay before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:opacity-0 group-hover:before:opacity-100 before:duration-300 ">
                                <img class="w-full aspect-square object-cover transform duration-300 group-hover:scale-110" :src="storageUrl(safeGet(item, 'images.main', null))" alt="product-card">
                            </div>
                            <div class="mt-5 md:mt-7">
                                <h4 class="font-medium leading-none dark:text-white text-xl">{{safeGet(item, `translations.${$i18n.locale}.name`, "")}}</h4>
                                <h5 class="mt-3 text-lg font-normal line-clamp-2 dark:text-white leading-[1.5]"><router-link :to="`/products/${safeGet(item, 'id', null)}`">{{safeGet(item, `translations.${$i18n.locale}.description`, "")}}</router-link></h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       <div class="s-py-100 bg-[#f5f5f5] dark:bg-dark-secondary">
            <div class="container">
                <div class="max-w-1366 mx-auto">
                    <div class="mb-6 pb-4 md:pb-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up">
                        <h2 class="font-semibold leading-none text-2xl sm:text-3xl lg:text-4xl text-center  sm:text-left">{{ $t("Why you Choose Us") }}</h2>
                    </div>
                    <div class="grid sm:grid-cols-2 lg:flex lg:justify-between gap-7 flex-wrap lg:flex-nowrap">
                        <div v-for="(item, index) in whyYouShouldChooseUs.slice(0,4)" :key="index" class="lg:max-w-[290px] w-full 2xl:flex items-center justify-between gap-7" data-aos="fade-up" data-aos-delay="200">
                            <div class="w-[1px] h-[120px] border-l border-dashed border-primary hidden 2xl:block" :class="index === 0 ? '2xl:hidden' : ''"></div>
                            <div class="text-center sm:text-left lg:max-w-[220px] w-full">
                                <img :src="item.image" alt="" class='size-12 mx-auto sm:mx-0' />
                                <h5 class="font-semibold text-xl md:text-2xl mt-3 md:mt-7">{{ item.title }}</h5>
                                <p class="mt-2 sm:mt-3">{{ item.desc }} </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> 
        <!-- <div class="s-py-100 bg-[#f5f5f5] dark:bg-dark-secondary">
            <div class="container">
                <div class="max-w-1366 mx-auto">
                    <div class="mb-6 pb-4 md:pb-6 border-b border-bdr-clr dark:border-bdr-clr-drk" data-aos="fade-up">
                        <h2 class="font-semibold leading-none text-2xl sm:text-3xl lg:text-4xl text-center  sm:text-left">Why you Choose Us</h2>
                    </div>
                    <div class="grid sm:grid-cols-2 lg:flex lg:justify-between gap-7 flex-wrap lg:flex-nowrap">
                        <div v-for="(item, index) in featureOne.slice(0,4)" :key="index" class="lg:max-w-[290px] w-full 2xl:flex items-center justify-between gap-7" data-aos="fade-up" data-aos-delay="200">
                            <div class="w-[1px] h-[120px] border-l border-dashed border-primary hidden 2xl:block" :class="index === 0 ? '2xl:hidden' : ''"></div>
                            <div class="text-center sm:text-left lg:max-w-[220px] w-full">
                                <img :src="item.image" alt="" class='size-12 mx-auto sm:mx-0' />
                                <h5 class="font-semibold text-xl md:text-2xl mt-3 md:mt-7">Easy to Return</h5>
                                <p class="mt-2 sm:mt-3">Satisfaction guaranteed or your money back! Enjoy stress-free returns with our hassle-free process. </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->

        <div class="s-py-100-50">
            <BestSeller/>
        </div> 
       
        <div class="py-16 bg-[#f5f5f5] dark:bg-dark-secondary" data-aos="fade-up">
            <div class="container">
                <PartnerOne/>
            </div>
        </div>

      

        <!-- <NewsLetterTwo/> -->

        <FooterOne/>

        <ScrollToTop/>

    </div>
</template>

<script setup>
    import { onMounted, ref, computed, watch } from 'vue';
    import BestSeller from '@/components/product/best-seller.vue';
    import PartnerOne from '@/components/partner/partner-one.vue';
    import ScrollToTop from '@/components/scroll-to-top.vue';
        import { featureOne } from '@/data/data';

    import bg from '@/assets/img/bg/home2.jpg'    
    import Aos from 'aos';
import { useProductStore } from '@/stores/productStore';
import { safeGet } from '@/core/helpers/utilFunctions';
import { storageUrl } from '@/core/helpers/envGetters';
import { useCategoryStore } from '@/stores/categoryStore';
import FooterOne from '@/components/footer/footer-one.vue';
import NavbarOne from '@/components/navbar/navbar-one.vue';
import { Head } from '@unhead/vue/components'
import { useI18n } from 'vue-i18n';

import fea1 from '@/assets/img/svg/fea-1.svg'
import fea2 from '@/assets/img/svg/fea-2.svg'
import fea3 from '@/assets/img/svg/fea-3.svg'
import fea4 from '@/assets/img/svg/fea-4.svg'
import fea5 from '@/assets/img/svg/fea-5.svg'

    const { t } = useI18n();
    const productStore = useProductStore();
    const categoryStore = useCategoryStore();
    const filters = ref({
        category_id: "",
        status_id: ""
    });

    const whyYouShouldChooseUs = computed(() => {
        return [
            {   
                image: fea1,
                title: t("Unique Handmade Designs"),
                desc: t("Every product is crafted with care and creativity. You won’t find mass-produced items here—each puppet/art piece has its own story.")
            },
            {   
                image: fea2,
                title: t("High-Quality Materials"),
                desc: t("We use safe, durable, and eco-friendly materials, ensuring your puppets and crafts last for years.")
            },
            {   
                image: fea3,
                title: t("Cultural & Artistic Value"),
                desc: t("Our designs preserve traditional craftsmanship while blending modern 3D techniques—perfect for collectors, educators, and art lovers.")
            },
            {   
                image: fea4,
                title: t("Custom Orders & Personalization"),
                desc: t("Want something special? We create customized puppets and 3D crafts tailored to your needs, whether for theatre, education, or home décor.")
            },
        ]
    })
    const firstCategoryId = computed(() => {
        return safeGet(firstCategory.value, 'id', null);
    })

    const firstCategory = computed(() => {
        return categoryStore.categories && categoryStore.categories.length ? categoryStore.categories.filter(item => safeGet(item, 'order', '') == 100)[0] : null;
    })

    const getData = () => {
        console.log('filters', filters.value);
        productStore.getProducts({
            ...filters.value,
            ...productStore.pagination
        });
    }

    watch(()=>firstCategoryId.value, (newVal)=>{
        if(newVal){
            console.log('newVal', newVal);
            filters.value.category_id = newVal;
            getData();
        }
    }, {
        immediate: true
    });


  
    onMounted(()=>{

        Aos.init()
    })

</script>
