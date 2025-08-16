<template>
  <!-- Minimal wrapper around vue-3d-loader -->
  <vue3dLoader
    :filePath="resolvedSrc"
    :fileType="fileType"
    :height="numericHeight"
    :backgroundColor="bgColor"
    :enableDamping="true"
    :minDistance="minDistance"
    :maxDistance="maxDistance"
    :cameraPosition="cameraPosition"
    :enableDraco="enableDraco"
    :dracoDir="dracoDir"
  />
</template>

<script setup>
import { computed } from 'vue'
import { vue3dLoader } from 'vue-3d-loader'

const props = defineProps({
  // GLB/GLTF file URL (public path or imported with ?url)
  src: { type: String, required: true },
  // Height in px or number
  height: { type: [String, Number], default: 480 },
  // Background color (hex string/number) or null for transparent
  background: { type: [String, Number, null], default: 0xffffff },
    minDistance: { type: Number, default: 4.0 },
  maxDistance: { type: Number, default: 8.0 },
  // Camera initial position
  cameraPos: { type: Object, default: () => ({ x: 3, y: 2, z: 4 }) },
  // If your .glb is Draco-compressed, enable and set decoder dir
  enableDraco: { type: Boolean, default: false },
  // Default decoder dir used by vue-3d-loader (change if needed)
  dracoDir: { type: String, default: 'assets/draco/gltf/' },
})

// Normalize props for vue-3d-loader
const resolvedSrc = computed(() => props.src)
const numericHeight = computed(() => {
  if (typeof props.height === 'number') return props.height
  const n = parseInt(props.height, 10)
  return Number.isFinite(n) ? n : 480
})
const bgColor = computed(() => (props.background === null ? 'rgba(0,0,0,0)' : props.background))
const cameraPosition = computed(() => props.cameraPos)

// If URL lacks an extension, vue-3d-loader requires fileType
const fileType = computed(() => (props.src && props.src.includes('.') ? undefined : 'glb'))
</script>

<style scoped>
/* no extra styles needed */
</style>
