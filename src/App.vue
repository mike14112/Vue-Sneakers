
<script setup>
import  AppHeader from './components/AppHeader.vue'
import CardList from './components/CardList.vue';
// import  AppBasket from './components/AppBasket.vue'
</script>

<template>
<!-- <AppBasket/> -->
<div class=" bg-white w-4/5 m-auto  rounded-xl shadow-xl mt-14 "> 
 
<AppHeader/>
<div class="p-10 w-full ">
<div class="flex justify-between items-center ">
    <h2 class="text-3xl  font-bold m-8"> Все Кроссовки</h2>
    <div class="relative">
        <img src="/search.svg" alt="" class="absolute left-4 top-3">
        <input 
        type="text"
         placeholder="Поиск"
         class="border border-gray-200 outline-none rounded-md py-2  pl-11 pr-4 focus:border-gray-400">
 
        </div>
        
</div>
</div>

<CardList/>
</div>
</template>

<style scoped>


</style>
