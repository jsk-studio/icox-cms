<template>
    <TreeRender v-if="!state.loading" :tree="renderTree" />
    <DialogLayer />
  </template>
<script setup lang="ts">
import { TreeRender, DialogLayer, useSidebarTree } from "icox"
import { reactive } from "vue";
const state = reactive({ loading: true })
const renderTree = useSidebarTree()

setTimeout(() => {
    state.loading = false
}, 300);

</script>