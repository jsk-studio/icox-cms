import 'element-plus/dist/index.css'
import 'icox/dist/index.css'
import { store } from './store'
import { registCoxComponents, registCoxApp } from 'icox'

registCoxApp(store)
registCoxComponents({ 
    Header: () => import('./Header.vue')
})
