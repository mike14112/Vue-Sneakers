<script setup>
import AppCard from './AppCard.vue';

const onClickAdd =  ()  => {
  alert('added')
}
</script>
<template>

<div class="p-10">
  <h2 class="text-3xl  font-bold mb-8"> Все Кроссовки</h2>
  <div class="grid  grid-cols-4 gap-5 sm:grid-cols-2">
<AppCard image-url="/sneakers/sneakers-1.jpg"
 title="Мужские Кроссовки Nike Blazer Mid Suede" 
 :price="12999" 
 :is-added="false" 
  :is-favorite="false"
  :on-click-add="onClickAdd"/>


</div>

</div>

</template>
