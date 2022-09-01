import { createCombineList, FaasParams } from '@bilibili-bbq/cox'
import { mergeBizMaterialList } from './utils'
// import CoverSort from '@/components/base/sort/CoverSort.vue'
import { components } from './mapping'

type ISortContext = FaasParams & {
    params: { query: any } // sort 页 query, 如 pager 信息
}
type ISortData = {
    list: any[], // 数据表
    pager: { // 注意, 服务端会有多种返回结构, 需要转换不能透传
        ps: number,
        pn: number,
        total: number,
    }
}
type ISortSource = (ctx: ISortContext) => Promise<ISortData>

type ISortSubmitContext = FaasParams & {
    form: any, // 会根据 action 分发不同字段
}

type IOnSubmit = (ctx: ISortSubmitContext) => Promise<any>
type IOnBatchEdit = (ctx: ISortSubmitContext) => Promise<any>

type ISortPageAttrs = {
    tipText?: string, // 排序页文案提示
    onSubmit?: IOnSubmit, // 排序提交
    onBatchEdit?: IOnBatchEdit, // 跳转到指定顺序
}

export type IDefineCoverSortPage = {
    // common
    pool?: any,
    attrs?: ISortPageAttrs, // 透传 attrs
    exclude?: any, // @deprecated 暂定废弃, 特殊情况下, 排除部分页面基本的组件渲染
    initdeps?: string[], // 初始化依赖, 即全部依赖属性有值后才会请求 table
    // custom 
    source?: ISortSource,
    // combined list
    filter?: (string | string[])[], // 筛选项 names, 数组自动计算换行
    render?: any, // list 渲染组建替换
}

export function defineCoverSort(opts: IDefineCoverSortPage) {
    const { CoverSort } = components
    let render = CoverSort
    if (opts.render) {
        render = opts.render
    }
    opts.pool.flavors = [
        ...opts.pool?.flavors,
    ]
    const aspect = (name: string, combined: any, ctx: any = {}) => {
    }
    const getCombineList = createCombineList(opts, aspect)
    return {
        type: 'Blank',
        props: {},
        stableKey: true,
        slots: [{
            name: 'Blank',
            component: render,
            props: {
                attrs: opts.attrs,
                source: opts.source,
                initdeps: opts.initdeps,
            },
            slots: [{
                type: 'Filter',
                props: {
                    initdeps: opts.initdeps,
                    list: mergeBizMaterialList(getCombineList, 'filter'),
                },
            }]
        }]
    }
}

