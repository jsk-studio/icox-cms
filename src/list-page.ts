import { defineListPage } from "../lib-src";

const page = {
    action: [{
        name: '@upload',
        text: '上传素材',
        attrs: { type: 'success' },
    }],
    filter: [{
        name: 'app_type',
        defaultValue: -10,
    }]
}

export default defineListPage({
    source: async () => ({list: [], pager: { total: 0, pn: 1, ps: 10 }}),
    pool: { flavors: [page] },
    filter: ["@submit", 'app_type', "@reset"],
    table: ['@selection', '@operation'],
    action: ['@upload']
})