<template>
    <TreeRender v-if="!state.loading" :tree="renderTree" />
    <DialogLayer />
  </template>
<script setup lang="ts">
import { TreeRender, DialogLayer } from "@bilibili-bbq/cox"
import { reactive } from "vue";
import { useSidebarTree } from '../lib-src'
const state = reactive({ loading: true })
const renderTree = useSidebarTree()

setTimeout(() => {
    state.loading = false
}, 300);

</script>