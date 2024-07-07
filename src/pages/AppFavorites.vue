<script setup>
import axios from 'axios';
import CardList from '../components/CardList.vue';
import { ref, onMounted } from 'vue';

const favorites = ref([])

onMounted(async () => {
    try {
        const { data } = await axios.get('https://22388faf70970f30.mokky.dev/favorites?_relations=items')

        favorites.value = data.map(obj => obj.item);
        console.log()
    } catch (err) {
        console.log(err)
    }
})
</script>

<template>
    <div>
        <h1>Favorites</h1>
        <div class="mt-10">
            <CardList :items="favorites" :isFavorites="false" />
        </div>
    </div>
</template>



<style lang="scss" scoped></style>