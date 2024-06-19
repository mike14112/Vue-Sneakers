<script setup>
import AppCard from './AppCard.vue';
defineProps({
  items: Array
})
const onClickAdd = () => {
  alert('added')


}

</script>
<template>



  <div class="grid  grid-cols-4 gap-5 sm:grid-cols-2">
    <AppCard v-for="item in items " :key="item.id" :image-url="item.imageUrl" :title="item.title" :price="item.price"
      :is-added="false" :is-favorite="false" :on-click-add="onClickAdd" />



  </div>

</template>
