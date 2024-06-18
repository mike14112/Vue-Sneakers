<script setup>
import AppCard from './AppCard.vue';

const onClickAdd =  ()  => {
  alert('added')
}
</script>
<template>



  <div class="grid  grid-cols-4 gap-5 sm:grid-cols-2">
<AppCard image-url="/sneakers/sneakers-1.jpg"
 title="Мужские Кроссовки Nike Blazer Mid Suede" 
 :price="12999" 
 :is-added="false" 
  :is-favorite="false"
  :on-click-add="onClickAdd"/>



</div>

</template>
