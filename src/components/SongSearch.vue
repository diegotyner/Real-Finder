<script setup>
// Best Practice: Use defineProps and defineEmits for clear component API
const props = defineProps({
  // Vue standard for a two-way binding on an input element
  modelValue: {
    type: String,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

// Emits the new value back up to the parent App.vue
const updateSearch = (event) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <div id="searchControls" class="flex gap-5 mb-8">
    <input 
      id="searchBox" 
      type="text" 
      placeholder="Search for a song..." 
      :value="modelValue"
      @input="updateSearch"
      class="border border-gray-600 px-1 rounded-sm"
    />

    <a href="public/jrb_6.pdf" target="_blank" class="link"
      >Full Jazz Real Book 6th ed. PDF</a
    >
    <a href="public/jrb_5.pdf" target="_blank" class="link"
      >Full Jazz Real Book 5th ed. PDF</a
    >
  </div>
</template>
