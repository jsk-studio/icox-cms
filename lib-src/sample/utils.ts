
export function mergeBizMaterialList(getList: any, name: string) {
    return ({ ...ctx }: any) => {
        const { route, filter, getters, form, query } = ctx
        return getList(name, {
            is_other:  getters.nowBizVal !== filter.biz_from,
            biz: getters.nowBizVal ?? filter.biz_from, 
            material: form.material_type ?? filter.material_type ?? Number(query.material_type),
            path: route.fullPath,
        }, ctx)
    }
}

export function mergeBizMaterialDetail(getList: any, name: string) {
    return ({ ...ctx }: any) => {
        const { route, getters, form, query } = ctx
        return getList(name, {
            is_other: getters.nowBizVal !== form.biz_from,
            biz: form.biz_from, 
            material: form.material_type ?? Number(query.material_type),
            path: route.fullPath,
        }, ctx)
    }
}