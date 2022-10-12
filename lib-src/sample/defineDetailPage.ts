import { tryCall, createCombineList, FaasParams } from '@bilibili-bbq/cox'
import { mergeBizMaterialList, mergeBizMaterialDetail } from './utils'
import { getCoxAppState } from '@bilibili-bbq/cox'

// const { store, router, page_detail = {} } = common

type IDetailSubmitContext = FaasParams & {
    data: any, // 根据页面展示过滤后的表单数据
    form: any, // 全量表单数据
    raw: any, // 表单元素数据
}

type IListSourceContext = FaasParams & {
    // 无 faas 扩展属性
}

type IDetailSource = (ctx: IListSourceContext) => Promise<any>
type IDetailSubmit = (ctx: IDetailSubmitContext) => Promise<any>


type IDetailPageAttrs = {
    labelWidth?: string, // form item label width
    onSubmit?: IDetailSubmit, // 详情页提交
    onConfirm?: IDetailSubmit, // 详情页提交前确认 to block submit
}

export type IDefineDetailPage = {
    // common
    pool?: any, // 动态渲染结构, 详见结构 业务渲染结构说明
    attrs?: IDetailPageAttrs, 
    exclude?: any, // @deprecated 暂定废弃, 特殊情况下, 排除部分页面基本的组件渲染
    initdeps?: string[], // 表单依赖初始化, 当前表单有值后渲染后续表单, 解决页面闪烁问题
    // 产品定义了列表复制并应用时, 是否要初始化某些数据为源业务方数据
    initorigin?: string[], // 从数据源初始化数据
    // custom 
    source?: IDetailSource,
    origin?: IDetailSource,
    // combined list
    form?: (string | string[])[], // 筛选项 names, 数组自动计算换行
    render?: any, // detai 渲染组建替换
}

export function defineDetailPage(opts: IDefineDetailPage) {
    const coxState = getCoxAppState()
    let render = tryCall(opts.render, opts)
    opts.pool.flavors = [
        coxState.renders.page_detail,
        ...opts.pool?.flavors,
    ]
    const aspect = (name: string, combined: any, ctx: any = {}) => {
        if (name === 'form' && combined.form) {
            // 设置 action 默认按钮大小
            for (const act of combined.form) {
                act.style = {
                    'margin-bottom': '10px',
                    ...act.style,
                }
                act.inner = {
                    size: 'small',
                    ...act.inner,
                }
            }
        }
    }
    const getCombineList = createCombineList(opts, aspect)
    return {
        type: render?.component ? 'Custom' : 'Detail',
        component: render?.component,
        stableKey: true,
        props: {
            source: opts.source,
            origin: opts.origin,
            initorigin: opts.initorigin,
            onSubmit: opts.attrs?.onSubmit,
            onConfirm: opts?.attrs?.onConfirm,
        },
        slots: [{
            type: 'Form',
            props: {
                attrs: {
                    inline: true,
                    'label-width': opts.attrs?.labelWidth,
                },
                list: mergeBizMaterialDetail(getCombineList, 'form'),
                initdeps: opts.initdeps
            },
        }, {
            type: 'Form',
            name: 'Origin',
            props: {
                attrs: {
                    inline: true,
                    'label-width': opts.attrs?.labelWidth,
                },
                list: mergeBizMaterialDetail(getCombineList, 'form'),
                disabled: true,
                initdeps: opts.initdeps
            },
        } , ...(render?.slots || [])]
    }
}
