import './assets/css/main.css'

import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'
import HomeView from './views/HomeView.vue'

const app = createApp(App)

const router = createRouter({
  routes: [
    { path: '/', name: 'home', component: HomeView }
  ],
  history: createWebHistory(import.meta.env.BASE_URL)
})

app.use(router)
app.use(ui)

app.mount('#app')
