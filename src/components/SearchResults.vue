<script setup>
import noteUrl from '@/assets/musical-note.png';
const emit = defineEmits(['select-song']);
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
        <li 
          v-for="song in exactResults" 
          :key="`${song.title}-${song.edition}`"
          @click="$emit('select-song', song)" 
          class="text-md text-gray-800 clickable flex items-center space-x-2 p-1 hover:bg-indigo-50"
        >
          <img :src="noteUrl" alt="Company Logo" class="w-5 h-5 flex-shrink-0">
          {{ song.display_name }} 
          <span v-if="song.found.length" class="font-mono text-sm text-gray-500">(p.{{ song.found[0].page_number }}, ed.{{ song.found[0].edition_found }})</span>
          <span v-if="song.found.length > 1" class="ml-1 text-xs text-blue-400 font-bold">
            (+{{ song.found.length - 1 }} more)
          </span>
        </li>
      </ul>
      <p v-if="exactResults.length === 0" class="text-gray-500 italic mt-2">No exact matches found.</p>
    </div>

    <div class="flex-1 border border-gray-300 p-3 rounded-md">
      <h2 class="text-2xl font-semibold mb-3 border-b pb-1">Fuzzy Matches</h2>
      
      <ul class="space-y-1">
        <li 
          v-for="song in fuzzyResults" 
          :key="`${song.title}-${song.edition}`"
          @click="$emit('select-song', song)"
          class="text-md text-gray-800 pl-2 cursor-pointer hover:bg-gray-100 transition-colors"
        >
          {{ song.display_name }} 
          <span v-if="song.found.length" class="font-mono text-sm text-gray-500">(p.{{ song.found[0].page_number }}, ed.{{ song.found[0].edition_found }})</span>
          <span v-if="song.found.length > 1" class="ml-1 text-xs text-blue-500 font-bold">
            (+{{ song.found.length - 1 }} more)
          </span>
        </li>
      </ul>
      <p v-if="fuzzyResults.length === 0" class="text-gray-500 italic mt-2">No fuzzy matches found.</p>
    </div>
  </div>
</template>
