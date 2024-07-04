<script setup>
defineProps({
    title: String,
    descr: String,
    imageUrl: String
})
</script>

<template>
    <div class="flex flex-col items-center text-center max-auto ">
        <img :src="imageUrl" height="80" width="80" alt="info Image">
        <h2 class=" mt-4 text-2xl font-medium">{{ title }}</h2>
        <p class="text-gray-400 mt-2">{{ descr }}</p>
    </div>
</template>



<style scoped></style>