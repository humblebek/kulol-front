<template>
    <div>
        <NavbarOne/>

        <div class="flex items-center gap-4 flex-wrap bg-overlay p-14 sm:p-16 before:bg-title before:bg-opacity-70" :style="{backgroundImage:'url('+ bg + ')'}">
            <div class="text-center w-full">
                <h2 class="text-white text-8 md:text-[40px] font-normal leading-none text-center">{{$t("Products")}}</h2>
                <ul class="flex items-center justify-center gap-[10px] text-base md:text-lg leading-none font-normal text-white mt-3 md:mt-4">
                    <li><router-link to="/">{{ $t("Home") }}</router-link></li>
                    <li>/</li>
                    <li class="text-primary">{{$t("Products")}}</li>
                </ul>
            </div>
        </div>

        <div class="s-py-100" >
            <div class="container">
                <div class="max-w-[1477px] mx-auto flex items-start justify-between gap-8 md:gap-10 flex-col lg:flex-row">
                    <div class="grid gap-[15px] lg:max-w-[300px] w-full sm:grid-cols-2 lg:grid-cols-1" data-aos="fade-up">
                        <div class="bg-[#F8F8F9] dark:bg-dark-secondary p-5 sm:p-[30px]">
                            <h4 class="font-medium leading-none text-xl sm:text-2xl mb-5 sm:mb-6">{{ $t("Categories") }}</h4>
                            <div class="grid gap-5">
                                <template v-for="(category, index) in categoryStore.categories ?? []" :key="index">
                                    <label class="categoryies-iteem flex items-center gap-[10px]">
                                        <input v-model="filters.category_id" :value="category.id" class="appearance-none hidden" type="radio" name="categories">
                                        <span class="w-4 h-4 rounded-[5px] border border-title dark:border-white flex items-center justify-center duration-300">
                                            <svg class="duration-300 opacity-0" width="9" height="8" viewBox="0 0 9 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.05203 7.04122C2.87283 7.04122 2.69433 6.97322 2.5562 6.83864L0.532492 4.8553C0.253409 4.58189 0.249159 4.13351 0.522576 3.85372C0.796701 3.57393 1.24578 3.57039 1.52416 3.84309L3.05203 5.34122L7.61512 0.868804C7.89491 0.595387 8.34328 0.59822 8.6167 0.87872C8.89082 1.1578 8.88657 1.60689 8.60749 1.8803L3.54787 6.83864C3.40974 6.97322 3.23124 7.04122 3.05203 7.04122Z" fill="#BB976D"/>
                                            </svg>
                                        </span>
                                        <span class="text-title dark:text-white block sm:leading-none transform translate-y-[1px] duration-300 select-none">{{safeGet(category, `translations.${$i18n.locale}.name`, '')}} ({{ safeGet(category, 'products_count', 0) }})</span>
                                    </label>
                                </template>
                            </div>
                        </div>
                    </div>
                    <div class="lg:max-w-[1100px] w-full" data-aos="fade-up" data-aos-delay="200">
                        <LayoutOne :classList="'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8'" :productList="products.data ?? []"/>
                       <div class="flex justify-end mt-5">
                           <vue-awesome-paginate
                               :total-items="products.pagination.total"
                               v-model="filters.current_page"
                               :items-per-page="5"
                               :max-pages-shown="5"
                               paginate-buttons-class="btn-pagination"
                               active-page-class="btn-pagination-active"
                               back-button-class="back-btn-pagination"
                               next-button-class="next-btn-pagination"
                           />
                       </div>
                    </div>
                </div>
            </div>
        </div>

        <FooterOne/>

        <ScrollToTop/>

    </div>
</template>

<script setup>
    import { onMounted,ref, watch } from 'vue';
    import NavbarOne from '@/components/navbar/navbar-one.vue';
    import FooterOne from '@/components/footer/footer-one.vue';
    import ScrollToTop from '@/components/scroll-to-top.vue';
    import LayoutOne from '@/components/product/layout-one.vue';

    import bg from '@/assets/img/shortcode/breadcumb.jpg'
    import Aos from 'aos';

    import { useCategoryStore } from '@/stores/categoryStore';
import { safeGet } from '@/core/helpers/utilFunctions';
import { getProducts } from '@/api/productApi';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
    const route = useRoute();
    const router = useRouter();
    const filters = ref({
        category_id: null,
        current_page: 1,
    });
    const products = ref({data:[], pagination: {
        total: 0,
        per_page: 12,
        current_page: 1,

    }});

    watch(()=>filters.value, ()=>{
        router.push({path: '/products', query: filters.value});
        getProductsData();

    }, {deep: true})

    const categoryStore = useCategoryStore();

    const getProductsData = () => {
        getProducts(filters.value).then(res=>{
            products.value.data = res.data;
            products.value.pagination = res.meta;

        })
    }
    const getCategories = () => {
        if(!categoryStore.categories) {
            categoryStore.getCategories();
        }
    }
    onMounted(()=>{
        filters.value.category_id = route.query.category_id ?? null;
        Aos.init()
        getCategories();
        getProductsData();
    })

</script>


<style>
 .btn-pagination {
    height: 40px;

    width: 40px;

    border: none;

    margin-inline: 5px;

    cursor: pointer;
    background-color: rgba(187, 182, 182, 0.333);
  }

  .back-btn-pagination {
    background-color: rgba(187, 182, 182, 0.333);
  }

  .next-btn-pagination {
    background-color: rgba(187, 182, 182, 0.333);
  }

  .btn-pagination-active {
    background-color: #172430;

    color: white;
  }
  </style>