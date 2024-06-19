<script setup>
import { onMounted, ref, reactive, watch, } from 'vue';
import axios from 'axios';
import AppHeader from './components/AppHeader.vue'
import CardList from './components/CardList.vue';
// import  AppBasket from './components/AppBasket.vue'

const filters = reactive({
    sortBy: 'title',
    seachQuerry: ''
})
const items = ref([])
// const seachQuerry = ref('')
// const seachQuerry = ref('')

const onChangeQuery = (event) => {
    filters.seachQuerry = event.target.value
}

const onChangeSortBy = event => {
    filters.sortBy = event.target.value
    console.log(event.target.value)
}

const fetchItems = async () => {
    try {
        const params = {
            sortBy: filters.sortBy
        }
        if (filters.seachQuerry) {
            params.title = `*${filters.seachQuerry}*`
        }
        const { data } = await axios.get(`https://22388faf70970f30.mokky.dev/sneakers`,
            {
                params
            }
        )
        items.value = data
    } catch (err) {
        console.log(err)
    }
}

onMounted(fetchItems)
watch(filters, fetchItems)


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
                        <input @change="onChangeQuery" type="text" placeholder="Поиск"
                            class="border border-gray-200 outline-none rounded-md py-2  pl-11 pr-4 focus:border-gray-400">

                    </div>

                </div>
            </div>
        </div>

        <CardList :items="items" />
    </div>
</template>

<style scoped></style>
