import './index.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
const routes = [
    { path: '/', component: 'Home' },
    { path: '/AppFavorites', component: 'Favorites' },


]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')