<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="titleId"
      >
        <!-- Overlay -->
        <div class="fixed inset-0 bg-black/40" aria-hidden="true" @click="close" />

        <!-- Panel -->
        <transition name="pop">
          <div ref="panel" class="relative w-full max-w-4xl p-4">
            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              <!-- Header -->
              <div
                class="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600"
              >
                <h3 :id="titleId" class="text-xl font-semibold text-gray-900 dark:text-white">
                  <slot name="title">Modal title</slot>
                </h3>
                <button
                  type="button"
                  class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="close"
                  aria-label="Close modal"
                >
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
              </div>

              <!-- Body -->
              <div class="p-4 md:p-5 space-y-4">
                <slot></slot>
              </div>

            </div>
          </div>
        </transition>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  titleId: { type: String, default: 'modal-title' },
})
const emit = defineEmits(['update:modelValue', 'accept', 'decline', 'close'])

const panel = ref(null)
let prevFocused = null

function lockScroll(on) {
  const b = document.body
  on ? b.style.setProperty('overflow', 'hidden') : b.style.removeProperty('overflow')
}

function trapTab(e) {
  if (!props.modelValue || e.key !== 'Tab') return
  const list = panel.value?.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
  )
  if (!list || list.length === 0) return
  const first = list[0]
  const last = list[list.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault(); last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault(); first.focus()
  }
}

function onOpenChange(open) {
  if (open) {
    prevFocused = document.activeElement
    lockScroll(true)
    window.addEventListener('keydown', trapTab)
    window.addEventListener('keydown', onEsc)
    requestAnimationFrame(() => {
      panel.value?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus()
    })
  } else {
    window.removeEventListener('keydown', trapTab)
    window.removeEventListener('keydown', onEsc)
    lockScroll(false)
    prevFocused?.focus?.()
  }
}

function onEsc(e) {
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  }
}

function close() {
  emit('update:modelValue', false)
  emit('close')
}
function accept() {
  emit('accept')
  close()
}
function decline() {
  emit('decline')
  close()
}

watch(() => props.modelValue, onOpenChange)
onBeforeUnmount(() => { onOpenChange(false) })
</script>

<style>
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease }
.fade-enter-from, .fade-leave-to { opacity: 0 }
.pop-enter-active, .pop-leave-active { transition: transform .18s ease, opacity .18s ease }
.pop-enter-from, .pop-leave-to { transform: scale(.97); opacity: 0 }
</style>
