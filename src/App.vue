<template>
    <TreeRender v-if="!state.loading" :tree="renderTree" />
    <DialogLayer />
  </template>
<script setup lang="ts">
import { TreeRender, DialogLayer } from "@bilibili-bbq/cox"
import { computed, reactive } from "vue";
import { sidebar } from './sidebar'

const state = reactive({ loading: true })

const renderTree = computed(() => sidebar.allMatch)

setTimeout(() => {
    state.loading = false
}, 300);

</script>