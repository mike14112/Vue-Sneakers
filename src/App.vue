<script setup>
import { onMounted, ref, watch } from 'vue';

import AppHeader from './components/AppHeader.vue'
import CardList from './components/CardList.vue';
// import  AppBasket from './components/AppBasket.vue'

const items = ref([])
const sortBy = ref('')
// const seachQuerry = ref('')

const onChangeSortBy = event => {
    sortBy.value = event.target.value
    console.log(event.target.value)
}

onMounted(() => {
    const response = fetch('https://22388faf70970f30.mokky.dev/sneakers')
        .then(res => res.json(response))
        .then(data => items.value = data)
})

watch(sortBy, async () => {
    const response = fetch('https://22388faf70970f30.mokky.dev/sneakers?sortBy=' + sortBy.value)
        .then(res => res.json(response))
        .then(data => items.value = data)
    console.log(items)
})


</script>

<template>
    <!-- <AppBasket/> -->
    <div class=" bg-white w-4/5 m-auto  rounded-xl shadow-xl mt-14 ">

        <AppHeader />
        <div class="p-10 w-full ">
            <div class="flex justify-between items-center ">
                <h2 class="text-3xl  font-bold m-8"> Все Кроссовки</h2>

                <div class="flex  gap-4">
                    <select @change="onChangeSortBy" class="py-2 px3 border  border-rounded-md outline-none">
                        <option value="name">По названию </option>
                        <option value="price">По цене (Дешевые) </option>
                        <option value="-price">По названию (Дорогие) </option>

                    </select>
                    <div class="relative">
                        <img src="/search.svg" alt="" class="absolute left-4 top-3">
                        <input type="text" placeholder="Поиск"
                            class="border border-gray-200 outline-none rounded-md py-2  pl-11 pr-4 focus:border-gray-400">

                    </div>

                </div>
            </div>
        </div>

        <CardList :items="items" />
    </div>
</template>

<style scoped></style>
