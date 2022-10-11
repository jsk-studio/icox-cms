import { createRouter, createWebHistory } from 'vue-router';
import { sidebar } from './sidebar';

export const router = createRouter({
    history: createWebHistory(),
    routes: sidebar.routes,
})
