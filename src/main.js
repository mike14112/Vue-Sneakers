import './index.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import AppHome from './pages/AppHome.vue'
import AppFavovites from '.pages/AppFavorites.vue'


const routes = [
    { path: '/', name: 'Home', component: AppHome },
    { path: '/AppFavorites', name: 'Favorites', component: AppFavovites },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')