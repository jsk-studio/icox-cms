import { defineSidebarRouter } from '../lib-src'

const routes = [{
    name: 'MaterialList',
    path: '/material-list',
    load: () => import('./list-page'),
}, {
    name: 'MaterialList2',
    path: '/material-list2',
    load: { component: () => import("./MPage.vue" )}
   
}]

export const sidebar = defineSidebarRouter({
    routes,
    title: 'cox test',
    sidebar: [
      { title: '素材库', icon: 'el-icon-magic-stick' },
      { title: '素材库|【自研】素材库', route: 'MaterialList' },
      { title: '素材库|【自研】素材库2', route: 'MaterialList2' },
    ],
    mapping: {
        0: ['MaterialList', 'MaterialList2']
    }
})