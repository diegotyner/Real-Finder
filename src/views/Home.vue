<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import Fuse from 'fuse.js'; 
import { song_metadata } from '@/data/song_metadata.ts'; 
import { createLinkTarget, titleCase } from '@/utils/utils.ts';

import SongSearch from '@/components/SongSearch.vue';
import SearchResults from '@/components/SearchResults.vue';
import SongMetadata from '@/components/SongMetadata.vue';

const searchQuery = ref('');
const exactMatches = ref([]);
const fuzzyMatches = ref([]);
const MAX_RESULTS = 20;
const selectedSong = ref(null);

const showMetadata = (song) => {
  selectedSong.value = song;
  // Optional: Add logic to scroll or display a modal here
};

/*
  {
    "title": "500 Miles High",
    "composer": "Chick Corea",
    "key": "Emin",
    "rhythm": "Bossa Nova",
    "time_signature": "4/4",
    "found": [
      {
        "edition_found": 6,
        "page_number": 141,
        "scanned_title": "500 MILES HIGH",
        "match_score": 100.0
      }
    ]
  },
*/

// Best Practice: Initialize complex external libraries once.
const fuse = new Fuse(
  song_metadata.map(s => ({ ...s, title: s.title.toLowerCase() })),
  {
    keys: ["title"],
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
  const exact = song_metadata.filter((song) =>
    song.title.toLowerCase().includes(query)
  );

  // Fuzzy matches (Using the initialized Fuse object)
  const fuzzy = fuse.search(query);

  // Update reactive state
  exactMatches.value = exact.slice(0, MAX_RESULTS).map(song => ({
    ...song,
    display_name: titleCase(song.title),
    link: createLinkTarget(song.title, song.page_num, song.edition)
  }));

  fuzzyMatches.value = fuzzy.slice(0, MAX_RESULTS).map(result => ({
    ...result.item,
    display_name: titleCase(result.item.title),
    link: createLinkTarget(result.item.title, result.item.page_num, result.item.edition),
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
      @select-song="showMetadata"
    />

    <SongMetadata 
      :song-data="selectedSong" 
      v-if="selectedSong" 
      @close-modal="selectedSong = null" 
    />
  </div>
</template>

<style>
/* Any global resets or typography not covered by Tailwind */
</style>
