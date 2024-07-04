<script setup>
import CartListItem from './CartListItem.vue'
import HeadBasket from './HeadBasket.vue'
import infoBlock from './infoBlock.vue'
const emit = defineEmits(['createOrder'])
defineProps({
  totalPrice: Number,
  vatPrice: Number,
  cartButtonDisabled: Boolean
})

</script>

<template>
  <div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
  <div class="bg-white w-96 h-full fixed right-0 top-0 z-20 p-8">
    <HeadBasket />
    <div class="flex h-full items-center justify-center" v-if="!totalPrice">
      <infoBlock title="Корзина Пустая " descr="lorem" imageUrl="/package-icon.png" />

    </div>
    <div v-else>
      <CartListItem />
      <div class="flex flex-col gap-4 mt-7">
        <div class="flex gap-2">
          <span>Итого : </span>
          <div class="flex-1 border-b border-dashed border-black"></div>
          <b>{{ totalPrice }} руб.</b>
        </div>
        <div class="flex gap-2">
          <span>Налог 5% : </span>
          <div class="flex-1 border-b border-dashed border-black"></div>
          <b>{{ vatPrice }} руб.</b>
        </div>

        <button :disabled="cartButtonDisabled" @:click="() => emit('createOrder')"
          class="mt-4 bg-lime-500 w-full rounded-xl py-3 text-white font-bold transition disabled:bg-slate-300 hover:bg-line-600 active:bg-lime-700 cursor-pointer">
          Оформить Заказ
        </button>
      </div>
    </div>
  </div>
</template>
