
export const page_list_raw = {
    filter: [{
        name: '@submit',
        type: "button",
        action: 'submit',
        label: '搜索',
        attrs: { type: 'primary' }
    }, {
        name: '@reset',
        type: "button",
        action: 'reset',
        label: '重置'
    }],
    table: [{
        name: '@selection',
        type: 'selection',
    }, {
        label: "操作",
        name: "@operation",
        type: "operation",
        attrs: { width: '150px', fixed: 'right' },
        inner: { column: 1 },
        exts: [{
            name: '@operation/column2',
            inner: { column: 2 },
            attrs: { width: '190px', fixed: 'right' }
        }, {
            name: '@operation/column3',
            inner: { column: 3 },
            attrs: { width: '240px', fixed: 'right' }
        }]
    }]
}