<template>
  <Teleport to="body">
    <dialog
      ref="el"
      :class="['mx-auto w-[calc(100%-2rem)] sm:w-auto', sizeClass, 'rounded-2xl p-0 shadow-2xl border border-gray-200/60 bg-white dark:bg-zinc-900 dark:border-zinc-800']"
      :aria-labelledby="labelId"
      :aria-describedby="descId"
      @close="onClose"
      @cancel="onCancel"
      @click="onBackdropClick"
    >
      <!-- Ichki kontent -->
      <div class="p-6 sm:p-7">
        <header class="flex items-start gap-3 mb-4">
          <slot name="icon">
            <!-- ixtiyoriy icon uchun joy -->
          </slot>
          <div class="flex-1">
            <slot name="title">
              <h2 :id="labelId" class="text-xl font-semibold text-gray-900 dark:text-white">
                Dialog title
              </h2>
            </slot>
            <slot name="subtitle">
              <!-- ixtiyoriy kichik matn -->
            </slot>
          </div>

          <button
            v-if="showClose"
            type="button"
            @click="close('dismiss')"
            class="inline-flex items-center justify-center rounded-xl p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring ring-indigo-300 transition"
            aria-label="Close"
          >
            ✕
          </button>
        </header>

        <section :id="descId" class="mb-6 text-gray-700 dark:text-gray-200">
          <slot />
        </section>

        <footer class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2">
          <slot name="footer">
            <!-- Default footer (method="dialog" bilan returnValue ishlaydi) -->
            <form method="dialog" class="flex gap-2">
              <button
                value="cancel"
                class="px-4 py-2 rounded-xl border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-zinc-800 focus:outline-none focus:ring ring-gray-300 transition"
              >
                Cancel
              </button>
              <button
                value="ok"
                class="px-4 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring ring-indigo-300 transition"
              >
                OK
              </button>
            </form>
          </slot>
        </footer>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  labelledby: { type: String, default: '' },
  describedby: { type: String, default: '' },
  size: { type: String, default: 'md' }, // sm | md | lg | xl
  backdropClose: { type: Boolean, default: true },
  escClose: { type: Boolean, default: true },
  showClose: { type: Boolean, default: true },
})

const emit = defineEmits(['update:modelValue', 'close', 'cancel'])

const el = ref(null)
const labelId = ref(props.labelledby || `dlg-title-${uid()}`)
const descId  = ref(props.describedby || `dlg-desc-${uid()}`)

const sizeClass = computed(() => {
  switch (props.size) {
    case 'sm': return 'sm:max-w-sm'
    case 'lg': return 'sm:max-w-2xl'
    case 'xl': return 'sm:max-w-4xl'
    default:   return 'sm:max-w-lg'
  }
})

watch(
  () => props.modelValue,
  (v) => {
    if (!el.value) return
    if (v && !el.value.open) el.value.showModal()
    if (!v && el.value.open) el.value.close()
  },
  { immediate: true }
)

function close(val) {
  el.value && el.value.close(val)
}

function onClose(ev) {
  emit('update:modelValue', false)
  const dlg = ev.target
  emit('close', { returnValue: dlg.returnValue })
}

function onCancel(ev) {
  if (!props.escClose) {
    ev.preventDefault() // ESC bilan yopilmasin desangiz
    return
  }
  emit('cancel')
}

function onBackdropClick(ev) {
  if (!props.backdropClose) return
  const dlg = el.value
  if (!dlg) return
  const rect = dlg.getBoundingClientRect()
  const inside =
    ev.clientX >= rect.left && ev.clientX <= rect.right &&
    ev.clientY >= rect.top  && ev.clientY <= rect.bottom
  if (!inside) close('backdrop')
}

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

defineExpose({
  open: () => el.value && el.value.showModal(),
  close,
})
</script>

<style scoped>
/* Backdrop (Tailwind bilan ::backdrop ni bevosita bosib bo'lmaydi, shu uchun CSS) */
dialog::backdrop {
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(2px);
}

/* Kirish animatsiyasi */
dialog[open] {
  animation: dlg-in 140ms ease-out;
}
@keyframes dlg-in {
  from { opacity: 0; transform: scale(.98); }
  to   { opacity: 1; transform: scale(1); }
}
</style>
