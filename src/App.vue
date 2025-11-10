<template>
  <div id="app-container">
    <header class="bg-white px-6 py-3 sticky top-0 z-40 border-b border-1 ">
      <nav class="flex space-x-4 items-center">
        <router-link to="/">Home</router-link>
        <span>|</span>
        <router-link :to="{ name: 'SongIndex', params: { edition: 3 } }">Edition 3 Index</router-link>
        <span>|</span>
        <router-link :to="{ name: 'SongIndex', params: { edition: 5 } }">Edition 5 Index</router-link>
        <span>|</span>
        <router-link :to="{ name: 'SongIndex', params: { edition: 6 } }">Edition 6 Index</router-link>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>
