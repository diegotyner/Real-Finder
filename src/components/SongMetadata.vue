<script setup>
import { createLinkTarget, titleCase, getNormalizedTitle } from '@/utils/utils.ts';
import { readLocalStorage, writeLocalStorage } from '@/utils/localStorageWrapper';
import { useSetlist } from '@/utils/useSetlist';

const emit = defineEmits(['close-modal']);
const { toggleSong, isInSetlist } = useSetlist();

const props = defineProps({
  songData: {
    type: Object,
    required: true
  }
});

const closeModal = () => {
    emit('close-modal');
};
</script>

<template>
  <div 
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    @click.self="closeModal" 
  >
    <div class="bg-white rounded-lg shadow-2xl p-6 max-w-lg w-full relative">
      <button 
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-900" 
        @click="closeModal"
      >
        &times;
      </button>
      <h2 class="text-3xl font-bold text-indigo-800 border-b pb-2 mb-4">
        {{ songData.display_name || titleCase(songData.title) }}
      </h2>
      <div class="grid grid-cols-2 gap-4 text-lg">
        <p><strong>Composer:</strong> {{ songData.composer }}</p>
        <p><strong>Key:</strong> {{ songData.key ? songData.key : songData.composer != 'No Metadata' ? 'C' : 'No Metadata' }}</p>
        <p><strong>Rhythm:</strong> {{ songData.rhythm }}</p>
        <p><strong>Time Signature:</strong> {{ songData.time_signature }}</p>
      </div>

      <h3 class="text-xl font-semibold mt-6 mb-3 border-t pt-3">Locations Found:</h3>
      <ul class="space-y-2">
        <li 
          v-for="item in songData.found" 
          :key="`${item.edition_found}-${item.page_number}`"
          class="bg-white p-3 border rounded shadow-sm relative"
        >
          <!--  
            getNormalizedTitle NEEDED Here.
            Ensures that exact matches and fuzzy matches are counted as the same song.
          -->
          <button 
            @click="toggleSong(getNormalizedTitle(item.scanned_title), item.edition_found, item.page_number)"
            class="absolute top-3 right-20 px-2 py-1 rounded text-xs font-bold transition-colors"
            :class="isInSetlist(getNormalizedTitle(item.scanned_title), item.edition_found, item.page_number) ? 'bg-red-100 text-red-600' : 'bg-gray-200 text-gray-600'"
          >
            {{ isInSetlist(getNormalizedTitle(item.scanned_title), item.edition_found, item.page_number) ? '❤️ Setlist' : '🤍 Add' }}
          </button>
          <a :href="createLinkTarget(item.scanned_title, item.page_number, item.edition_found)" target="_blank" class="absolute top-3 right-3 text-sm text-indigo-600"> View PDF</a>

          <p><strong>Edition:</strong> {{ item.edition_found }}</p>
          <p><strong>Page:</strong> {{ item.page_number }}</p>
          <p><strong>Scanned Title:</strong> {{ item.scanned_title }}</p>
          <p><strong>Confidence:</strong> {{ item.match_score.toFixed(1) }}%</p>
        </li>
      </ul>
    </div>
  </div>
</template>
