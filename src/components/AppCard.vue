<script setup>
defineProps({
   imageUrl:String,
    title: String,
    price:Number,
  isFavorite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFavorite:Function
})
</script>

<template>
<div class=" relative m-10 border  bg-white border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl">
  <img :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'" class="absolute top-0 left-8">
  <img :src="imageUrl" alt="">
  <p class="mt-2">{{title}}</p>
  <div class="flex  justify-between mt-5" >
      <div>
        <span class="text-slate-400">Цена:</span> <br>
        <b>{{price}} руб.</b>
      </div>
      <img :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus" @click="onClickAdd">
  </div>
</div>
</template>