<script setup>
import { ref, watch, computed } from 'vue';
import Fuse from 'fuse.js'; // Assumes you installed: npm install fuse.js
import { songs } from './data/songs.js'; // Assumes songs.js is moved to data/songs.js

import SongSearch from './components/SongSearch.vue';
import SearchResults from './components/SearchResults.vue';

// 1. State Management
const searchQuery = ref('');
const exactMatches = ref([]);
const fuzzyMatches = ref([]);
const MAX_RESULTS = 20;

// 2. Utility Functions (Moved from script block)
const titleCase = (str) => {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};

const createLinkTarget = (song_name, page_num, edition) => {
  // Use a computed property for cleaned song name once
  const cleanedName = song_name.trim().replaceAll(" ", "_").toUpperCase();
  return `public/jrb-${edition}-ed/${page_num}/${cleanedName}.pdf`;
};

// 3. Fuse.js Setup (Initialization Logic)
// Best Practice: Initialize complex external libraries once.
const fuse = new Fuse(
  songs.map(s => ({ ...s, song_name: s.song_name.toLowerCase() })),
  {
    keys: ["song_name"],
    includeScore: true,
  }
);

// 4. Reactive Search Logic (Replacing the 'input' event listener)
// Best Practice: Use Vue's reactive 'watch' for input-driven side effects.
watch(searchQuery, (newQuery) => {
  if (!newQuery) {
    exactMatches.value = [];
    fuzzyMatches.value = [];
    return;
  }

  const query = newQuery.toLowerCase();

  // Exact matches (Case-insensitive check)
  const exact = songs.filter((song) =>
    song.song_name.toLowerCase().includes(query)
  );

  // Fuzzy matches (Using the initialized Fuse object)
  const fuzzy = fuse.search(query);

  // Update reactive state
  exactMatches.value = exact.slice(0, MAX_RESULTS).map(song => ({
    ...song,
    display_name: titleCase(song.song_name),
    link: createLinkTarget(song.song_name, song.page_num, song.edition)
  }));

  fuzzyMatches.value = fuzzy.slice(0, MAX_RESULTS).map(result => ({
    ...result.item,
    display_name: titleCase(result.item.song_name),
    link: createLinkTarget(result.item.song_name, result.item.page_num, result.item.edition),
    score: result.score.toFixed(2)
  }));
});
</script>

<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold">Song Finder</h1>
    <a href="/legacy.html" class="mb-6 inline-block link">Raw html site</a>

    <SongSearch v-model="searchQuery" />

    <SearchResults 
      :exact-results="exactMatches"
      :fuzzy-results="fuzzyMatches"
    />
  </div>
</template>

<style>
/* Any global resets or typography not covered by Tailwind */
</style>
