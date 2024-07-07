<script setup>
import { inject } from 'vue';
import CartItem from './CartItem.vue'
const { cartItems, onClickRemoveCart } = inject('cart')

</script>

<template>
  <div class="flex flex-1 flex-col">
    <CartItem v-for="item in cartItems" :key="item.id" :image-url="item.imageUrl" :title="item.title"
      :price="item.price" @onClickRemoveCart=" isFavorite ? null : () => onClickRemoveCart(item)"> </CartItem>
  </div>
</template>

<style lang="scss" scoped></style>
