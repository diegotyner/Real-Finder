<template>
  <div id="app-container">
    <header>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link :to="{ name: 'SongIndex', params: { edition: 5 } }">Edition 5 Index</router-link> |
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
