<script setup>
import { useGlobalOverlay } from './composable/useGlobalOverlay';
import Overlay from '@/components/Overlay.vue'
import { onMounted } from 'vue';
import { useCategoryStore } from './stores/categoryStore';
import { usePartnerStore } from './stores/partnerStore';

const partnerStore = usePartnerStore();
const categoryStore = useCategoryStore();
const { active, text } = useGlobalOverlay()

  const getCategories = () => {
        categoryStore.getCategories();
    }

  const getBrands = () => {
    partnerStore.getBrands();
  }
    onMounted(() => {
        getCategories();
        getBrands();
    });
</script>

<template>
    

 <router-view/>
   <Overlay v-model="active" :text="text" />

</template>

<style scoped></style>
