import 'element-plus/dist/index.css'
import '@bilibili-bbq/cox/dist/index.css'
import { store } from './store'
import { registCoxComponents, registCoxApp } from '@bilibili-bbq/cox'

registCoxApp(store)
registCoxComponents({ 
    Header: () => import('./Header.vue')
})
