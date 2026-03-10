<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import type { CreateCustomerResponse } from '@/api/onboard'

const customerNumber = ref('')
const response = ref<CreateCustomerResponse | null>(null)

onMounted(() => {
  const num = sessionStorage.getItem('gtn_customer_number')
  const raw = sessionStorage.getItem('gtn_onboard_response')
  if (num) customerNumber.value = num
  if (raw) {
    try {
      response.value = JSON.parse(raw) as CreateCustomerResponse
    } catch {
      response.value = null
    }
  }
})
</script>

<template>
  <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6">
    <div class="rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center shadow-xl animate-fade-in">
      <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
        <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h2 class="mt-4 text-2xl font-bold text-white">Account created</h2>
      <p class="mt-2 text-zinc-400">Your GTN trading account has been created successfully.</p>

      <div v-if="customerNumber" class="mt-8 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4 text-left">
        <p class="text-sm font-medium text-zinc-400">Customer number</p>
        <p class="mt-1 font-mono text-lg text-white">{{ customerNumber }}</p>
      </div>

      <div v-if="response?.cashAccountNumbers?.length" class="mt-4 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4 text-left">
        <p class="text-sm font-medium text-zinc-400">Cash accounts</p>
        <ul class="mt-1 list-inside list-disc font-mono text-sm text-zinc-300">
          <li v-for="acc in response.cashAccountNumbers" :key="acc">{{ acc }}</li>
        </ul>
      </div>

      <div v-if="response?.accountNumbers?.length" class="mt-4 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4 text-left">
        <p class="text-sm font-medium text-zinc-400">Security accounts</p>
        <ul class="mt-1 list-inside list-disc font-mono text-sm text-zinc-300">
          <li v-for="acc in response.accountNumbers" :key="acc">{{ acc }}</li>
        </ul>
      </div>

      <div class="mt-10 flex justify-center gap-4">
        <RouterLink
          to="/"
          class="rounded-lg border border-zinc-600 px-5 py-2.5 text-sm font-medium text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          Back to home
        </RouterLink>
        <RouterLink
          to="/onboard"
          class="rounded-lg bg-emerald-500/20 px-5 py-2.5 text-sm font-medium text-emerald-400 transition hover:bg-emerald-500/30"
        >
          Open another account
        </RouterLink>
      </div>
    </div>
  </div>
</template>
