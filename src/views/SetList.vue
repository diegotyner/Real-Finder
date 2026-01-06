<script setup lang="ts">
import { ref, computed } from 'vue';
import { useSetlist } from '@/utils/useSetlist';
import { createLinkTarget, titleCase } from '@/utils/utils';
import exampleData from '@/data/exampleSetlist.json';

const { setlistIds, toggleSong, count } = useSetlist();

const recentRemovals = ref<Array<any>>([]);

const props = defineProps<{
  mode: string | null; 
}>();

const IS_EXAMPLE = (props.mode === 'Example')
const orderedSongs = computed(() => {
  let sourceArray = [];

  if (IS_EXAMPLE) {
    sourceArray = exampleData.map(id => {
      const [title, edition, page] = id.split('|');
      return { title, edition: parseInt(edition), page_number: parseInt(page) };
    });
  } else {
    sourceArray = Array.from(setlistIds.value as Set<string>).map(id => {
      const [title, edition, page] = id.split('|');
      return { title, edition: parseInt(edition), page_number: parseInt(page) };
    });
  }

  return sourceArray.map(song => ({
    ...song,
    id: `${song.title}|${song.edition}|${song.page_number}`,
    displayTitle: titleCase(song.title)
  })).sort((a, b) => a.displayTitle.localeCompare(b.displayTitle));
});

const handleRemove = (song: any) => {
  // Save before removing from local storage
  recentRemovals.value.unshift({ ...song });
  
  // // Optional snippet to limit history size
  // const HISTORY_SIZE = 10
  // if (recentRemovals.value.length > HISTORY_SIZE) {
  //   recentRemovals.value.pop();
  // }

  // Toggle song in local storage (deletes)
  toggleSong(song.title, song.edition, song.page_number);
};

const handleUndo = (song: any, index: number) => {
  // Toggle song in local storage (adds/restores)
  toggleSong(song.title, song.edition, song.page_number);
  
  // Remove from recent
  recentRemovals.value.splice(index, 1);
};
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto space-y-10">
    <!-- Active Set List Section -->
    <section>
      <div v-if="!IS_EXAMPLE" class="flex items-center justify-between mb-6 border-b pb-4">
        <div >
          <h1 class="text-3xl font-bold text-gray-900">Your Set List</h1>
          <router-link to="/SetList/Example" class="link">See example</router-link>
        </div>
        <div class="flex items-center space-x-2">
          {{ count }} songs
        </div>
      </div>
      <div v-else class="flex items-center justify-between mb-6 border-b pb-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-900">Example Set List</h1>
          <router-link to="/SetList/Personal" class="link">See personal</router-link>
        </div>
        <div class="flex items-center space-x-2">
            {{ orderedSongs.length }} songs
        </div>
      </div>


      <!-- Empty State -->
      <div v-if="!IS_EXAMPLE && count === 0" class="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
        <p class="text-gray-500 mb-1 font-medium">No songs in your list yet.</p>
        <router-link to="/" class="text-indigo-600 font-bold clickable">
          Search for songs to add
        </router-link>
      </div>

      <!-- List of Added Songs -->
      <ul v-else class="grid gap-3">
        <li 
          v-for="song in orderedSongs" 
          :key="song.id" 
          class="flex items-center justify-between px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-100"
        >
          <div>
            <h3 class="font-bold text-gray-800">{{ song.displayTitle }}</h3>
            <p class="text-xs text-gray-400 font-medium">
              Edition {{ song.edition }} - Page {{ song.page_number }}
            </p>
          </div>
          
          <div class="flex items-center space-x-4">
            <a 
              :href="createLinkTarget(song.title.toUpperCase(), song.page_number, song.edition)" 
              target="_blank"
              class="text-sm text-indigo-600"
            >
              View PDF
            </a>
            <button 
              v-if="!IS_EXAMPLE"
              @click="handleRemove(song)" 
              class="text-red-300 hover:text-red-500 clickable"
              title="Remove from set list"
            >
              &times;
            </button>
          </div>
        </li>
      </ul>
    </section>

    <!-- Accidental Deletion Safeguard (Session-specific History) -->
    <section v-if="recentRemovals.length > 0" class="bg-gray-50 p-6 rounded-xl border border-gray-300">
      <h2 class="font-black tracking-widest mb-4">Recent Removals</h2>
      <ul class="space-y-2">
        <li 
          v-for="(song, index) in recentRemovals" 
          :key="'trash-' + song.id"
          class="flex items-center justify-between bg-white/50 p-3 rounded border border-gray-200 border-dashed"
        >
          <span class="text-sm text-gray-400 line-through italic">
            {{ song.displayTitle }} (Ed. {{ song.edition }})
          </span>
          <button 
            @click="handleUndo(song, index)"
            class="text-xs font-bold text-indigo-600 bg-white px-3 py-1 rounded shadow-xs border border-gray-100 clickable"
          >
            Restore
          </button>
        </li>
      </ul>
    </section>
  </div>
</template>
