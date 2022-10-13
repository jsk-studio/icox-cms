import { cloneDeep } from 'lodash'
import { tryCall, createCombineList, getCoxAppState } from 'icox'
import { mergeBizMaterialList } from './utils'
import { deepMerge, COX_MODLE_FAAS } from 'icox'

type IDefineFormDialogAttrs = {
    title?: string, // 弹窗标题
    width?: string, // 弹窗宽度
    labelWidth?: string, // 表单 label width 
}

export type IDefineFormDialog = {
    // common
    pool?: any,
    title?: string, // 弹窗标题,
    attrs?: IDefineFormDialogAttrs,
    exclude?: any,
    // custom 
    source?: any, // 弹窗数据源
    // combined list
    form?: (string | string[])[],
}

export function defineFormDialog(opts: IDefineFormDialog) {
    const coxState = getCoxAppState()
    const coxFaasState = getCoxAppState(COX_MODLE_FAAS)
    if (!opts.pool) {
        // @ts-ignore
        opts.pool = cloneDeep(coxFaasState.pool)
    }
    opts.pool.flavors = [
        coxState.renders.dialog_form,
        ...opts.pool?.flavors,
    ]
    const aspect = (name: string, combined: any, ctx: any = {}) => {
        if (name === 'form' && combined.form) {
            // 设置 action 默认按钮大小
            for (const act of combined.form) {
                act.style = {
                    'margin-bottom': '20px',
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
        type: 'Dialog',
        props: {
            attrs: {
                title: opts.title ?? opts.attrs?.title,
                width: opts.attrs?.width || '600px',
            },
            source: opts.source,
        },
        slots: [{
            type: 'Form',
            name: 'Custom',
            props: {
                attrs: {
                    'label-width': opts.attrs?.labelWidth || '160px',
                },
                list: mergeBizMaterialList(getCombineList, 'form'),
            },
        }]
    }
}


export function showFormDialog(ctx: any) {
    return async (dialogRaw: any) => {
        const { row } = ctx
        const dialogAttrs = {
            attrs: {
                title: ctx.def.text,
            },
            source: row && cloneDeep(row),
        }
        const newAttrs = await tryCall(dialogRaw, ctx)
        const dialog = defineFormDialog(
            deepMerge(dialogAttrs, newAttrs)
        )
        return await ctx.showDialog(dialog)
    }
}

