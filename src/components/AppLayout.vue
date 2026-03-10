<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-[var(--background)] text-zinc-100 flex flex-col">
    <header class="border-b border-zinc-800/50 sticky top-0 z-50 bg-[var(--background)]/90 backdrop-blur">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 flex h-14 items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 font-semibold text-white">
          <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 text-sm font-bold text-white">
            N
          </span>
          <span>Nexow GTN</span>
        </RouterLink>
        <nav class="flex items-center gap-6 text-sm text-zinc-400">
          <RouterLink to="/" class="hover:text-white transition-colors">Home</RouterLink>
          <RouterLink to="/onboard" class="hover:text-white transition-colors">Open Account</RouterLink>
        </nav>
      </div>
    </header>
    <main class="flex-1">
      <slot />
    </main>
    <footer class="border-t border-zinc-800/50 py-6">
      <div class="mx-auto max-w-5xl px-4 sm:px-6 text-center text-sm text-zinc-500">
        Nexow GTN — Trading platform powered by GTN
      </div>
    </footer>
  </div>
</template>
