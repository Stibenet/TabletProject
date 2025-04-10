import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import apiClient from "@/plugins/axios.js";
import './assets/main.css'

const app = createApp(App);

// Регистрация $axios как глобального свойства
app.config.globalProperties.$axios = apiClient;

app.use(ElementPlus);
app.mount('#app');








