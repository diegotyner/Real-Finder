<script setup>
// Best Practice: Components should be "dumb" (presentational) and accept all data via props.
const props = defineProps({
  exactResults: {
    type: Array,
    required: true
  },
  fuzzyResults: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div id="resultsContainer" class="flex gap-5 mt-4">
    <div class="flex-1 border border-gray-300 p-3 rounded-md">
      <h2 class="text-2xl font-semibold mb-3 border-b pb-1">Exact Matches</h2>
      
      <ul class="space-y-1">
        <li v-for="song in exactResults" :key="`${song.song_name}-${song.edition}`">
          <a :href="song.link" target="_blank" class="text-md text-gray-800 pl-2">
            {{ song.display_name }} (p.{{ song.page_num }}) (ed.{{ song.edition }})
          </a>
        </li>
      </ul>
      <p v-if="exactResults.length === 0" class="text-gray-500 italic mt-2">No exact matches found.</p>
    </div>

    <div class="flex-1 border border-gray-300 p-3 rounded-md">
      <h2 class="text-2xl font-semibold mb-3 border-b pb-1">Fuzzy Matches</h2>
      
      <ul class="space-y-1">
        <li v-for="song in fuzzyResults" :key="`${song.song_name}-${song.edition}-${song.score}`">
          <a :href="song.link" target="_blank" class="text-md text-gray-800 pl-2">
            {{ song.display_name }} (p.{{ song.page_num }}) (ed.{{ song.edition }}) 
            <span class="text-sm text-gray-400">[score: {{ song.score }}]</span>
          </a>
        </li>
      </ul>
      <p v-if="fuzzyResults.length === 0" class="text-gray-500 italic mt-2">No fuzzy matches found.</p>
    </div>
  </div>
</template>
