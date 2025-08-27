<script setup>
import { useGlobalOverlay } from './composable/useGlobalOverlay';
import Overlay from '@/components/Overlay.vue'

const { active, text } = useGlobalOverlay()
</script>

<template>
    

 <router-view/>
   <Overlay v-model="active" :text="text" />

</template>

<style scoped></style>
