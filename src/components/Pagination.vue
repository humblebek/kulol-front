<!-- Pagination.vue -->
<template>
  <nav class="flex items-center justify-center gap-3 select-none" aria-label="Pagination">
    <!-- Prev -->
    <template v-if="isLink">
      <span v-if="isFirst" class="text-slate-400"><ArrowLeft class="w-5 h-5"/></span>
      <router-link v-else :to="linkBuilder(prevPage)" aria-label="Previous">
      
        <span class="text-xl mdi mdi-arrow-left w-5 h-5 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"></span>
        <!-- <ArrowLeft class="w-5 h-5 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"/> -->
    </router-link>
</template>
<button v-else type="button" :disabled="isFirst"
class="text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
@click="go(prevPage)">
    <span class="text-xl mdi mdi-arrow-left w-5 h-5 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"></span>
    </button>

    <!-- Pages -->
    <template v-for="(it, i) in items" :key="i">
      <span v-if="it.type==='ellipsis'" class="px-2 text-xl text-slate-600 dark:text-slate-300">…</span>

      <template v-else>
        <router-link v-if="isLink" :to="linkBuilder(it.page)"
          :aria-current="it.page===current ? 'page' : undefined"
          class="px-3 py-2 rounded-md bg-gray-100 text-slate-900 dark:bg-white/10 dark:text-white
                 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900
                 transition-colors text-sm sm:text-base font-medium">
          {{ pad ? String(it.page).padStart(2,'0') : it.page }}
        </router-link>

        <button v-else type="button" @click="go(it.page)"
          :aria-current="it.page===current ? 'page' : undefined"
          class="px-3 py-2 rounded-md bg-gray-100 text-slate-900 dark:bg-white/10 dark:text-white
                 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900
                 transition-colors text-sm sm:text-base font-medium">
          {{ pad ? String(it.page).padStart(2,'0') : it.page }}
        </button>
      </template>
    </template>

    <!-- Next -->
    <template v-if="isLink">
      <span v-if="isLast" class="text-slate-400"><ArrowRight class="w-5 h-5"/></span>
      <router-link v-else :to="linkBuilder(nextPage)" aria-label="Next">
        <span class="mdi mdi-arrow-right text-xl w-5 h-5 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"></span>
        <!-- <ArrowRight class="w-5 h-5 text-slate-700 hover:text-slate-900 dark:text-slate-200 dark:hover:text-white"/> -->
      </router-link>
    </template>
    <button v-else type="button" :disabled="isLast"
      class="text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
      @click="go(nextPage)">
      <ArrowRight class="w-5 h-5"/>
    </button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  /* Siz ishlatayotgan prop aliaslari */
  page: { type: Number, default: undefined },         // alias of modelValue
  perPage: { type: Number, default: undefined },      // alias of pageSize
  total: { type: Number, default: undefined },        // alias of totalItems

  /* Oldingi API (ham qo'llanadi) */
  modelValue: { type: Number, default: undefined },
  totalPages: { type: Number, default: 0 },
  totalItems: { type: Number, default: 0 },
  pageSize:   { type: Number, default: 10 },

  siblingCount:  { type: Number, default: 1 },
  boundaryCount: { type: Number, default: 1 },

  linkBuilder: { type: Function, default: null },
  pad: { type: Boolean, default: true },
})
const emit = defineEmits(['update:modelValue','change'])

/* Normalizatsiya: aliaslarni hammasini qo'llab */
const current = computed(() => {
  const v = props.modelValue ?? props.page ?? 1
  return Math.max(1, v)
})
const size = computed(() => props.pageSize ?? props.perPage ?? 10)
const totalPages = computed(() => {
  if (props.totalPages > 0) return props.totalPages
  const items = (props.totalItems || props.total) ?? 0
  return Math.max(1, Math.ceil(items / size.value))
})

const isFirst = computed(() => current.value <= 1)
const isLast  = computed(() => current.value >= totalPages.value)
const prevPage = computed(() => Math.max(1, current.value - 1))
const nextPage = computed(() => Math.min(totalPages.value, current.value + 1))
const isLink = computed(() => !!props.linkBuilder)

function go(p) {
  const v = Math.min(Math.max(1, p), totalPages.value)
  if (v !== current.value) {
    emit('update:modelValue', v) // v-model qo'llash uchun
    emit('change', v)            // qo'shimcha hodisa
  }
}

/* Ellipsis hisoblash */
const items = computed(() => {
  const count = totalPages.value
  const page = current.value
  const s = Math.max(0, props.siblingCount)
  const b = Math.max(0, props.boundaryCount)
  const rng = (a, z) => Array.from({ length: Math.max(0, z - a + 1) }, (_, i) => a + i)

  if (count <= b * 2 + s * 2 + 3) return rng(1, count).map(p => ({ type: 'page', page: p }))

  const start = rng(1, b)
  const end = rng(Math.max(count - b + 1, b + 1), count)
  const left = Math.max(page - s, b + 2)
  const right = Math.min(page + s, count - b - 1)

  const res = []
  start.forEach(p => res.push({ type: 'page', page: p }))
  if (left > b + 2) res.push({ type: 'ellipsis' })
  else if (left === b + 2) res.push({ type: 'page', page: b + 1 })
  rng(left, right).forEach(p => res.push({ type: 'page', page: p }))
  const beforeEndFirst = count - b
  if (right < beforeEndFirst - 1) res.push({ type: 'ellipsis' })
  else if (right === beforeEndFirst - 1) res.push({ type: 'page', page: beforeEndFirst })
  end.forEach(p => res.push({ type: 'page', page: p }))
  return res
})

/* Kichik SVG o'qlar */
const ArrowLeft = { props:{class:{type:String,default:''}},
  template:`<svg :class="class" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>` }
const ArrowRight = { props:{class:{type:String,default:''}},
  template:`<svg :class="class" viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>` }
</script>
