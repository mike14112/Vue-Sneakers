<script setup>
const emit = defineEmits(['basketOpen'])
defineProps({
  totalPrice: Number
})
const basketOpen = () => {
  emit('basketOpen')
}
</script>

<template>
  <header class="flex justify-between items-center border-b border-slate-300 px-8 py-8">
    <div class="flex items-center gap-5">
      <img src="/logo.png" alt="Logo" class="w-10" />
      <div>
        <h1 class="text-xl font-bold uppercase">Vue Sneakers</h1>
        <p class="text-slate-500">Магазин лучших кроссовок</p>
      </div>
    </div>

    <nav>
      <ul class="flex items-center gap-10">
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black" @click="basketOpen">
          <img src="/cart.svg" alt="CART" />
          <b>{{ totalPrice }} руб.</b>
        </li>
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/heart.svg" alt="CART" />
          <span>Закладки</span>
        </li>
        <li class="flex items-center gap-3 cursor-pointer text-gray-500 hover:text-black">
          <img src="/profile.svg" alt="CART" />
          <span>Профиль</span>
        </li>
      </ul>
    </nav>
  </header>
</template>
