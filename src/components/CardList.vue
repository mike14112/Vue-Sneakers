<script setup>
import AppCard from './AppCard.vue'
defineProps({
  items: Array
})

const emit = defineEmits(['addTofavorite', 'addToCard'])




</script>
<template>
  <div class="grid grid-cols-4 gap-5 sm:grid-cols-2">
    <AppCard v-for="item in items" :key="item.id" :image-url="item.imageUrl" :title="item.title" :price="item.price"
      :is-added="item.isAdded" :is-favorite="item.isFavorite" :id="item.id"
      @onClickFavorite="() => emit('addTofavorite', item)" @onClickAdd="() => emit('addToCard', item)" />
  </div>
</template>
