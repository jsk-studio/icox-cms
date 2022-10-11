import './register'
import { createCoxApp } from '../lib-src';
import App from "./App.vue";
import { sidebar } from './sidebar'
import { router } from './router'
// 初始化
init();

async function init() {
    createCoxApp(App, { sidebar, router })
        .mount("#app")
}

