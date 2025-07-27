import { createApp } from 'vue'
import router from './router'
import NutUI from "@nutui/nutui";
import "@nutui/nutui/dist/style.css";
import './style.css'
import App from './App.vue'

createApp(App).use(router).use(NutUI).mount('#app')
