<template>
  <Teleport :to="teleportTo">
    <Transition name="ovl-fade" appear>
      <div v-if="modelValue" class="ovl-root" :style="{ zIndex: String(zIndex) }" role="presentation">
        <div class="ovl-backdrop" @click="onBackdrop"></div>

        <div class="ovl-panel" role="dialog" aria-modal="true" :aria-label="ariaLabel">
          <slot>
            <div class="ovl-box">
              <VueSpinnerClock :size="60" :color="'#BB976D'" />
              <!-- <span class="ovl-text">{{ text }}</span> -->
            </div>
          </slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { watchEffect } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  text: { type: String, default: 'Yuklanmoqda…' },
  zIndex: { type: Number, default: 2000 },
  lockScroll: { type: Boolean, default: true },
  closeOnBackdrop: { type: Boolean, default: false },
  teleportTo: { type: String, default: 'body' },
  ariaLabel: { type: String, default: 'Loading overlay' }
})

const emit = defineEmits(['update:modelValue'])

function onBackdrop() {
  if (props.closeOnBackdrop) emit('update:modelValue', false)
}

// body scrollni bloklash/yechish
watchEffect(() => {
  if (!props.lockScroll) return
  const cls = 'overlay-locked'
  const el = document.documentElement
  if (props.modelValue) el.classList.add(cls)
  else el.classList.remove(cls)
})
</script>

<style scoped>
.ovl-root { position: fixed; inset: 0; display: grid; place-items: center; }
.ovl-backdrop { position: absolute; inset: 0; background: rgba(0,0,0,.45); }
.ovl-panel { position: relative; z-index: 1; }
.ovl-box {
  display: flex; gap: .75rem; align-items: center;
  background: rgba(255,255,255,.96); color: #111;
  border-radius: 12px; padding: 14px 16px;
  box-shadow: 0 10px 30px rgba(0,0,0,.2);
  font: 14px/1.2 system-ui, Segoe UI, Roboto, Arial;
}
.ovl-spinner {
  width: 18px; height: 18px; border-radius: 50%;
  border: 2px solid currentColor; border-top-color: transparent;
  animation: ovl-spin .8s linear infinite;
}
@keyframes ovl-spin { to { transform: rotate(360deg); } }
.ovl-fade-enter-active, .ovl-fade-leave-active { transition: opacity .18s ease; }
.ovl-fade-enter-from, .ovl-fade-leave-to { opacity: 0; }
</style>

<style>
html.overlay-locked { overflow: hidden; }
</style>
