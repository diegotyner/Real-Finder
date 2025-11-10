<script setup>
import { ref } from 'vue'

const showBooks = ref(false)

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])
const updateSearch = (event) => {
  emit('update:modelValue', event.target.value)
}
</script>

<template>
  <div
    id="searchControls"
    class="flex flex-col sm:flex-row gap-4 mb-8 items-start sm:items-center"
  >
    <input
      id="searchBox"
      type="text"
      placeholder="Search for a song..."
      :value="modelValue"
      @input="updateSearch"
      class="border border-gray-600 px-2 py-1 rounded-md text-sm w-full sm:w-64"
    />

    <div class="relative w-full sm:w-auto">
      <button
        @click="showBooks = !showBooks"
        class="text-sm text-blue-700 border border-gray-600 rounded-md px-2 py-1 h-8 sm:h-auto w-full sm:w-auto flex items-center justify-between"
      >
        Full Real Books PDFs
        <span class="ml-1">{{ showBooks ? '▲' : '▼' }}</span>
      </button>

        <div
          v-if="showBooks"
          class="absolute left-0 top-full mt-1 flex flex-col w-full border border-gray-600 rounded-md px-2 py-1 bg-white shadow-lg z-10"
        >
          <a href="jrb_6.pdf" target="_blank" class="link text-sm hover:text-blue-500">6th Edition</a>
          <a href="jrb_5.pdf" target="_blank" class="link text-sm hover:text-blue-500">5th Edition</a>
          <a href="jrb_3.pdf" target="_blank" class="link text-sm hover:text-blue-500">3rd Edition</a>
        </div>
    </div>
  </div>
</template>
