<script setup>
import { onMounted, ref, reactive, watch, provide, computed } from 'vue'
import axios from 'axios'
import AppHeader from './components/AppHeader.vue'
import CardList from './components/CardList.vue'
import AppBasket from './components/AppBasket.vue'

const filters = reactive({
  sortBy: 'title',
  seachQuerry: ''
})
const items = ref([])
const cartItems = ref([])
const basketOpen = ref(false)

const totalPrice = computed(
  () => cartItems.value.reduce((acc, item) => acc += item.price, 0)
)
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))
const closeBasket = () => {
  basketOpen.value = false
  console.log(basketOpen.value)
}

const openBasket = () => {
  basketOpen.value = true
}

const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://22388faf70970f30.mokky.dev/favorites`)
    items.value = items.value.map(item => {
      const favorite = favorites.find(favorite => favorite.id === item.id)
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

console.log(filters.seachQuerry)

const onChangeSortBy = (event) => {
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

onMounted(async () => {
  await fetchItems()
  await fetchFavorites()
})

const onClickRemoveCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false

}

const onClickAddCart = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
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
        parentId: item.id
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


watch(filters, fetchItems)


provide('cart', {
  closeBasket,
  openBasket,
  cartItems,
  onClickRemoveCart
})

</script>

<template>
  <AppBasket v-if="basketOpen" :totalPrice="totalPrice" :vat-price="vatPrice" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <AppHeader @basketOpen="openBasket" :totalPrice="totalPrice" />
    <div class="p-10 w-full">
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
    </div>

    <CardList :items="items" @addTofavorite="addToFavorite" @addToCard="addToCard" />
  </div>
</template>

<style scoped></style>
