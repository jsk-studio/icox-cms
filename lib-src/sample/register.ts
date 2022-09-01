import { createApp } from "vue"
import ElementPlus from 'element-plus';
import locale from 'element-plus/lib/locale/lang/zh-cn'
import { common, components } from './mapping'

type IRegistOps = {
    store: any,
    router: any,
    page_detail?: any,
    page_list?: any,
    dialog_form?: any,
}

type IRegistComponents = {
    Header?: any,
    CoverSort?: any,
}

export function createCoxApp(app: any, opts: IRegistOps) {
    Object.assign(common, opts)
    return createApp(app)
        .use(opts.store)
        .use(opts.router)
        .use(ElementPlus, { locale })
}

export function registCoxComponents(comps: IRegistComponents = {}) {
    Object.assign(components, comps)
}
