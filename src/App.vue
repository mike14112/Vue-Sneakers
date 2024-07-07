<script setup>
import { ref, watch, provide, computed } from 'vue'
import axios from 'axios'
import AppHeader from './components/AppHeader.vue'
import AppBasket from './components/AppBasket.vue'


const cartItems = ref([])
const basketOpen = ref(false)
const isCreatingOrder = ref(false)



const totalPrice = computed(
  () => cartItems.value.reduce((acc, item) => acc += item.price, 0)
)
const vatPrice = computed(() => Math.round((totalPrice.value * 5) / 100))

const cartIsEmpty = computed(() => cartItems.value.length === 0);


const cartButtonDisabled = computed(() => isCreatingOrder.value || cartIsEmpty.value)


const closeBasket = () => {
  basketOpen.value = false
  console.log(basketOpen.value)
}

const openBasket = () => {
  basketOpen.value = true
}

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post(`https://22388faf70970f30.mokky.dev/orders`, {
      items: cartItems.value,
      totalPrice: totalPrice.value
    })
    cartItems.value = [];

    return data
  } catch (error) {
    console.log(error)
  } finally {
    isCreatingOrder.value = false
  }
}




const onClickRemoveCart = (item) => {
  cartItems.value.splice(cartItems.value.indexOf(item), 1)
  item.isAdded = false

}

const onClickAddCart = (item) => {
  cartItems.value.push(item)
  item.isAdded = true
}
watch(
  cartItems,
  () => {
    localStorage.setItem('cart', JSON.stringify(cartItems.value))
  },
  { deep: true }
)

provide('cart', {
  closeBasket,
  openBasket,
  cartItems,
  onClickRemoveCart,
  onClickAddCart
})

</script>

<template>
  <AppBasket v-if="basketOpen" :totalPrice="totalPrice" :vat-price="vatPrice" @createOrder="createOrder"
    :cartButtonDisabled="cartButtonDisabled" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <AppHeader @basketOpen="openBasket" :totalPrice="totalPrice" />
    <div class="p-10 w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
