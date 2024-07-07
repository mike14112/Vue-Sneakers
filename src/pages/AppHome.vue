<script setup>
import axios from 'axios';
import CardList from '../components/CardList.vue'
import { inject, reactive, watch, ref, onMounted } from 'vue';

const items = ref([])


const filters = reactive({
    sortBy: 'title',
    seachQuerry: ''
})


const { onClickAddCart, onClickRemoveCart, cartItems } = inject('cart')
const onChangeSortBy = (event) => {
    filters.sortBy = event.target.value
}

const addToCard = async (item) => {
    if (!item.isAdded) {
        onClickAddCart(item)
    } else {
        onClickRemoveCart(item)
    }
}


const addToFavorite = async (item) => {
    try {
        if (!item.isFavorite) {
            const obj = {
                item_id: item.id,
                item
            }
            item.isFavorite = true
            const { data } = await axios.post(`https://22388faf70970f30.mokky.dev/favorites`, obj)
            item.favoriteId = data.id
        } else {
            await axios.delete((`https://22388faf70970f30.mokky.dev/favorites/${item.favoriteId}`))
            item.isFavorite = false
            item.favoriteId = null
        }

    } catch (error) {
        console.log(error)
    }


}

const fetchFavorites = async () => {
    try {
        const { data: favorites } = await axios.get(`https://22388faf70970f30.mokky.dev/favorites`)
        items.value = items.value.map(item => {
            const favorite = favorites.find(favorite => favorite.item_id === item.id)
            console.log(favorite)
            if (!favorite) {
                return item
            }
            return {
                ...item,
                isFavorite: true,
                favoriteId: favorite.id
            }
        })
    } catch (err) {
        console.log(err)
    }
}




const fetchItems = async () => {
    try {
        const params = {
            sortBy: filters.sortBy
        }
        if (filters.seachQuerry) {
            params.title = `*${filters.seachQuerry}*`
        }
        const { data } = await axios.get(`https://22388faf70970f30.mokky.dev/sneakers`, {
            params
        })
        items.value = data.map(obj => ({
            ...obj,
            isFavorite: false,
            isAdded: false
        }))
    } catch (err) {
        console.log(err)
    }
}

watch(filters, fetchItems)

onMounted(async () => {
    const localCart = localStorage.getItem('cart')
    cartItems.value = localCart ? JSON.parse(localCart) : []
    await fetchItems()
    await fetchFavorites()

    items.value = items.value.map((item) => ({
        ...item,
        isAdded: cartItems.value.some((cartItem) => cartItem.id === item.id)
    }))
    console.log(items.value)
})
watch(cartItems, () => {
    items.value = items.value.map((item) => ({
        ...item,
        isAdded: false
    }))
})
</script>

<template>
    <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold m-8">Все Кроссовки</h2>

        <div class="flex gap-4">
            <select v-model="onChangeSortBy" class="py-2 px3 border border-rounded-md outline-none">
                <option value="name">По названию</option>
                <option value="price">По цене (Дешевые)</option>
                <option value="-price">По названию (Дорогие)</option>
            </select>
            <div class="relative">
                <img src="/search.svg" alt="" class="absolute left-4 top-3" />
                <input v-model="filters.seachQuerry" type="text" placeholder="Поиск"
                    class="border border-gray-200 outline-none rounded-md py-2 pl-11 pr-4 focus:border-gray-400" />
            </div>
        </div>
    </div>
    <div class="mt-10">
        <CardList :items="items" @addTofavorite="addToFavorite" @addToCard="addToCard" />

    </div>
</template>



<style lang="scss" scoped></style>