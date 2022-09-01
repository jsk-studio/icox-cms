import 'element-plus/dist/index.css'
import '@bilibili-bbq/cox/dist/index.css'
import { createStore } from 'vuex';
import { createRouter, createWebHistory } from 'vue-router';
import { createCoxApp, registCoxComponents } from '../lib-src';

registCoxComponents({ Header: null })

import App from "./App.vue";
import { sidebar } from './sidebar';

const store = createStore({})

const router = createRouter({
    history: createWebHistory(),
    routes: sidebar.routes,
})

// 初始化
init();

async function init() {
    const coxOpts = { router, store }
    createCoxApp(App, coxOpts)
        .mount("#app")
}

