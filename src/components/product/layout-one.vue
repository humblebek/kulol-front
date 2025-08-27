<template>
    <div :class="classList">
        <div v-for="(item, index) in productList" :key="index" class="group">
            <div class="relative overflow-hidden">
                <router-link :to="`/products/${item.id}`">
                    <img class="w-full aspect-square object-cover transform group-hover:scale-110 duration-300" :src="storageUrl(safeGet(item, 'images.main', null))" alt="shop"/>
                </router-link>
            </div>
            <div class="md:px-2 lg:px-4 xl:px-6 lg:pt-6 pt-5 flex gap-4 md:gap-5 flex-col">
                <!-- <h4 class="font-medium leading-none dark:text-white text-lg">{{item.price}}</h4> -->
                <div>
                    <h5 class="font-normal dark:text-white text-xl leading-[1.5]">
                        <router-link :to="`/products/${item.id}`" class="text-underline">
                           {{safeGet(item, `translations.${$i18n.locale}.name`, "")}}
                        </router-link>
                    </h5>
                  
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

    import { storageUrl } from '@/core/helpers/envGetters';
import { safeGet } from '@/core/helpers/utilFunctions';
import { defineProps } from 'vue';

    defineProps({
        productList:Array,
        classList:String
    })

</script>
