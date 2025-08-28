<script setup>
import { useGlobalOverlay } from './composable/useGlobalOverlay';
import Overlay from '@/components/Overlay.vue'
import { onMounted } from 'vue';
import { useCategoryStore } from './stores/categoryStore';

const categoryStore = useCategoryStore();
const { active, text } = useGlobalOverlay()

  const getCategories = () => {
        categoryStore.getCategories();
    }

    onMounted(() => {
        getCategories();
    });
</script>

<template>
    

 <router-view/>
   <Overlay v-model="active" :text="text" />

</template>

<style scoped></style>
