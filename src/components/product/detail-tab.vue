<template>
    <div class="container-fluid">
        <div class="max-w-[985px] mx-auto">
            <div class="product-dtls-navtab  border-y border-bdr-clr dark:border-bdr-clr-drk">
                <ul id="user-nav-tabs" class=" text-title dark:text-white text-base sm:text-lg lg:text-xl flex leading-none gap-3 sm:gap-6 md:gap-12 lg:gap-24 justify-between sm:justify-start max-w-md sm:max-w-full">
                    <li @click="activeTab = 1" class="py-3 sm:py-5 lg:6 relative before:absolute before:w-full before:h-[1px] before:bg-title before:top-full before:left-0 before:duration-300 dark:before:bg-white before:opacity-0" :class="activeTab === 1 ? 'active' : ''"><router-link to="" class="duration-300 hover:text-primary">{{ $t("Description") }}</router-link></li>
                </ul>
            </div>
            <div id="content" class="mt-5 sm:mt-8 lg:mt-12 mx-0 sm:mr-5 md:mr-8 lg:mr-12">
                <div v-if="activeTab === 1">
                    {{ props.description }}
                    <!-- <p class="sm:text-lg">Crafted with plush cushioning and ergonomic design, it offers unparalleled comfort for lounging or reading. Its timeless style seamlessly blends with any decor, while the sturdy construction ensures durability for years to come. Whether you're unwinding after a long day or enjoying a leisurely weekend, this chair provides the perfect retreat.</p>
                    <ul class="mt-4 sm:mt-6 grid gap-4 sm:gap-5 sm:text-lg leading-none">
                        <li>Leather : From Japan</li>
                        <li>Brand : Navana</li>
                        <li>Weight : 1kg</li>
                        <li>Color : Wooden , Whtie , Blue , Orange</li>
                    </ul> -->
                </div>
               
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    // import { detailReview, shippingAbout, venderInfo } from '@/data/data';
    const props = defineProps({
        description: {
            type: String,
            required: true
        }
    });

    // const {description} = 
    const activeTab = ref(1)

</script>
