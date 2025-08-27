// src/composables/useGlobalOverlay.ts
import { ref } from 'vue'

const active = ref(false)
const text = ref('Yuklanmoqda…')

export function useGlobalOverlay() {
  function show(msg) {
    if (msg) text.value = msg
    active.value = true
  }
  function hide() {
    active.value = false
  }
  return { active, text, show, hide }
}
