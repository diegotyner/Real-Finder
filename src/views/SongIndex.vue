<template>
  <div class="p-6">
    <h1 class="text-3xl font-bold mb-6">Song Index: Edition {{ edition }}</h1>
    <div v-if="processedSongList.length">
      <table>
        <colgroup>
          <col style="width: 80px" />   <!-- Page + button -->
          <col style="width: 60%" />     <!-- Title -->
          <col style="width: auto" />    <!-- Composer -->
        </colgroup>
        <thead> 
          <tr>
            <th>Page</th>
            <th>Title</th>
            <th>Composer</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(song, index) in processedSongList" :key="index">
            <td>
              {{ song.page_number }}
              <button 
                @click="toggleSong(getNormalizedTitle(song.title), edition, song.page_number)"
              >
              {{ isInSetlist(getNormalizedTitle(song.title), edition, song.page_number) ? '❤️' : '🤍' }}
              </button>
            </td>
            <td>
              <a :href="song.link" target="_blank" rel="noopener noreferrer">
                {{ titleCase(song.title.toLowerCase()) }}
              </a>
            </td>
            <td :class="{ 'no-metadata': song.composer === 'No Metadata' }">{{ song.composer }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      <p>No songs found for Edition {{ edition }}.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { getNormalizedTitle } from '@/utils/utils.ts';
import { editionIndex } from '@/data/indexed_data'; // The pre-processed index data
import { createLinkTarget } from '@/utils/createLinkTarget'; // The utility function
import { titleCase } from '@/utils/titleCase';
import { useSetlist } from '@/utils/useSetlist';

const { setlistIds, toggleSong, isInSetlist } = useSetlist();

// Define component options like 'name' using the defineOptions macro (Vue 3.3+)
// If on an older version, this must be omitted, and 'name' must be defined 
// only via the filename.
defineOptions({
    name: 'SongIndex'
});

// Define the expected data structure for a single index entry
interface SongEntry {
    title: string;
    composer: string;
    page_number: number;
}

// Define Props using the defineProps macro (replaces the 'props: {}' option)
const props = defineProps<{
    edition: string | number; // TypeScript syntax for props definition
}>();

// The logic that was in 'computed: {}' is now a standard variable assignment
// using the computed() function from 'vue'.
const processedSongList = computed(() => {
    // 1. Get the edition number (string key for JSON, number for function)
    const edKey = String(props.edition);
    const edNum = Number(props.edition);

    // 2. Retrieve the raw list (add type assertion to satisfy TypeScript)
    const rawList: SongEntry[] = editionIndex[edKey] || [];

    // 3. Map over the list to calculate and add the link
    return rawList.map(song => ({
        ...song,
        // Calculate the link
        link: createLinkTarget(song.scanned_title, song.page_number, edNum)
    }));
});
</script>

<style scoped>
/* Minimal CSS for readability */
table { width: 100%; border-collapse: collapse; table-layout: fixed; }
th { background-color: #f5f5f5; }
th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
tbody tr:hover {
  background-color: #f0f0f0;
}
th:first-child, td:first-child { 
  text-align: center; 
}

th:last-child, td:last-child { 
  text-align: center; 
}

button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
}
.no-metadata {
  text-decoration: line-through;
  color: #aaa;  /* optional: mute it a bit too */
}

td a:hover {
  color: #241f6e;        /* match your indigo/blue tone */
  text-decoration: underline;  /* underline appears only on hover */
}
</style>
