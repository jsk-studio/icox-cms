import { createApp } from "vue"
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import { common, components, renders } from './mapping'

export const COX_MODLE_APP = '[cox]app'

type IRegistOps = {
    router: any,
    sidebar: any,
}

type IRegistComponents = {
    Header?: any,
    CoverSort?: any,
}

type IRegistRenders = {
    page_detail?: any,
    page_list?: any,
    dialog_form?: any,
}

const coxAppModule = {
    namespaced: true,
    state: { 
        collapse: false,
        sidebar: null,
        renders: {},
        components: {},
    },
    mutations: {
        setSidebar (state: any, payload: any) {
            state.sidebar = payload
        },
        registRenders (state: any, payload: any) {
            Object.assign(state.renders, payload)
        },
        registComponents (state: any, payload: any) {
            Object.assign(state.components, payload)
        },
        toggleCollapse(state: any) {
            state.collapse = !state.collapse
        },
    }
}

export function createCoxApp(App: any, opts: IRegistOps) {
    Object.assign(common, opts)
    const { sidebar } = opts
    const { store } = common
    const app = createApp(App)
        .use(common.store)
        .use(opts.router)
        .use(ElementPlus, { locale })

    store.commit(`${COX_MODLE_APP}/setSidebar`, sidebar)
    return app
}

export function registCoxApp(store: any) {
    Object.assign(common, { store })
    if (!store.hasModule(COX_MODLE_APP)) {
        store.registerModule(COX_MODLE_APP, coxAppModule)
    }
}

export function registCoxComponents(comps: IRegistComponents = {}) {
    Object.assign(components, comps)
    common.store.commit(`${COX_MODLE_APP}/registComponents`, components)
}

export function registCoxRenders(reds: IRegistRenders = {}) {
    Object.assign(renders, reds)
    common.store.commit(`${COX_MODLE_APP}/registRenders`, renders)
}

export function getCoxAppState() {
    return common.store.state[COX_MODLE_APP] || {}
}
