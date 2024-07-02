<script setup>
const emit = defineEmits(['onClickRemoveCart'])
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,


})

</script>
<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" alt="Sneakers" />

    <div class="flex flex-col gap-4 my-7">
      <p>{{ title }}</p>
      <div class="w-52 flex justify-between mt-2">
        <b>{{ price }}</b>
        <img class="opacity-40 hover:opacity-100 cursor-pointer transition" src="/close.svg" alt="Close"
          @:click=" emit('onClickRemoveCart')" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
