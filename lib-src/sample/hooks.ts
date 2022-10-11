import { computed, unref } from 'vue'
import { useState, COX_MODLE_APP } from '@bilibili-bbq/cox'

export function useSidebarTree(test?: any) {
    const { sidebar: sidebarRef } = useState(COX_MODLE_APP, ['sidebar'])
    const sidebar = unref(sidebarRef)
    if (!test) {
        return computed(() => sidebar.allMatch)
    } else {
        return computed(() => sidebar.match(test))
    }
}