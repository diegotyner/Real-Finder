<template>
  <div id="app-container">
    <header class="bg-white px-6 py-3 sticky top-0 z-40 border-b border-1 ">
      <nav class="flex space-x-4 items-center">
        <router-link to="/">Home</router-link>
        <span>|</span>
        <router-link :to="{ name: 'SetList', params: { mode: 'Personal' } }">Set List</router-link>
        <span>|</span>
        <router-link :to="{ name: 'SongIndex', params: { edition: 3 } }">Ed. 3</router-link>
        <span>|</span>
        <router-link :to="{ name: 'SongIndex', params: { edition: 5 } }">Ed. 5</router-link>
        <span>|</span>
        <router-link :to="{ name: 'SongIndex', params: { edition: 6 } }">Ed. 6</router-link>
      </nav>
    </header>

    <main>
      <router-view :key="$route.fullPath"></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { useSetlist } from '@/utils/useSetlist';

  const { count } = useSetlist();
</script>

<style>
/* .router-link-active { */
/*   @apply font-bold text-indigo-800; */
/* } */
</style>
