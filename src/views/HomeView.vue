<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-16 sm:px-6">
    <div class="text-center max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Nexow <span class="text-emerald-400">GTN</span> Trading Platform
      </h1>
      <p class="mt-4 text-lg text-zinc-400">
        Open an account and start trading. Powered by GTN.
      </p>
      <div class="mt-10 flex justify-center gap-4">
        <RouterLink
          to="/onboard"
          class="inline-flex items-center rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:from-emerald-600 hover:to-emerald-700"
        >
          Open Account
        </RouterLink>
      </div>
    </div>
  </div>
</template>
