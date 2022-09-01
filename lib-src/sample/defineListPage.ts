import { mergeBizMaterialList, mergeBizMaterialDetail } from './utils'
import { cloneDeep } from 'lodash'
import { tryCall, createCombineList, FaasParams } from '@bilibili-bbq/cox'
import { common, page_list_raw } from './mapping'
import { x_array } from './x'

const { store, router, page_list = {} } = common


type IListPageAttrs = {
    tableHeight?: string, // table fixed height
    pager?: any, // el-pagination 透传参数
}

type IListData = {
    list: any[], // 数据表
    pager?: { // 注意, 服务端会有多种返回结构, 需要转换不能透传
        ps: number,
        pn: number,
        total: number,
    }
}
export type IListContext = FaasParams & {
    // 无 faas 扩展属性
}
export type IListPageSource = (ctx: IListContext) => Promise<IListData>

export type IDefineListPage = {
    // common
    pool?: any, // 动态渲染结构, 详见结构 业务渲染结构说明
    raw?: any, // @deprecated 已废弃, 原为动态渲染扩展项
    attrs?: IListPageAttrs, // 自定义模型渲染属性, 详见代码注释
    exclude?: any, // @deprecated 暂定废弃, 特殊情况下, 排除部分页面基本的组件渲染

    // custom 
    initdeps?: string[], // 初始化依赖, 即全部依赖属性有值后才会请求 table
    source?: IListPageSource, // 数据源获取

    // combined list
    filter?: (string | string[])[], // 筛选项 names, 数组自动计算换行
    table?: string[], // 筛选项 names
    action?: string[], // 筛选项 names
    operation?: string[], // 筛选项 names
    // render
    render?: any, // list 渲染组建替换
}

export function defineListPage(opts: IDefineListPage) {
    const { source, operation, initdeps, render } = opts
    const tableAspect = (name: string, combined: any, ctx: any = {}) => {
        if (name === 'action' && combined.action) {
            // 设置 action 默认按钮大小
            for (const act of combined.action) {
                if (!act.attrs?.size) {
                    act.attrs = { ...act.attrs, size: 'small' }
                }
            }
        }
        if (!operation || !combined.operation) {
            return
        }
        combined.operation = combined.operation.filter((n: any) => {
            return !combined.exclude?.includes(n.name)
        })
        const operationMap = (o: any) => ({
            ...o,
            visible: (({ row, ...mctx }: any) => {
                const opExclude = ctx.utils.getExcludes({
                    ...ctx, 
                    row,
                    not: (vals: any[]) => ctx.not(vals, 'operation'),
                    ext: (vals: any[]) => ctx.ext(vals, 'operation'),
                }, 'operation')
                return tryCall(o.visible, { row , ...mctx }, true) && !opExclude.includes(o.name) && ctx.mapped.operation.includes(o.name)
            })
        })
        for (const column of combined.table) {
            if (column.type === 'operation') {
                column.value = combined.operation.map(operationMap)
                column.value.sort((a: any, b: any) => {
                    return operation.indexOf(a.extParent || a.name) - operation.indexOf(b.extParent || b.name)
                })
            }
        }
    }
    opts.pool.flavors = [
        page_list_raw,
        page_list,
        ...opts.pool?.flavors,
        ...x_array(opts.raw)
    ]
    const getCombineList = createCombineList(opts, tableAspect)
    return {
        type: render?.component ? 'Custom' : 'List',
        component: render?.component,
        stableKey: true,
        props: {
            pool: opts.pool,
            fixedpage: true,
        },
        slots: [{
            type: 'Filter',
            props: {
                initdeps: initdeps,
                list: mergeBizMaterialList(getCombineList, 'filter'),
            },
        },{
            type: 'ButtonGroup',
            name: 'Action',
            props: {
                list: mergeBizMaterialList(getCombineList, 'action'),
            }
        }, {
            type: 'Table',
            stableKey: true,
            props: {
                source,
                fixheight: opts.attrs?.tableHeight,
                initdeps: initdeps,
                list: mergeBizMaterialList(getCombineList, 'table'),
            },
        }, {
            type: 'Pagination',
            props: {
                fixed: true,
                attrs: opts.attrs?.pager,
            },
        }, ...(render?.slots || [])]
    }
}