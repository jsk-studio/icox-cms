<template>
    <div class="header">
      <div class="left">
        <div class="collapse" @click="toggleCollapse">
          <i
            :class="{
              iconfont: true,
              'el-icon-s-unfold': collapse,
              'el-icon-s-fold': !collapse
            }"
          ></i>
        </div>
      </div>
     
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { useState, useMutations, COX_MODLE_APP } from "@bilibili-bbq/cox"
  const route = useRoute()
  const { collapse } = useState(COX_MODLE_APP, ['collapse'])
  const { toggleCollapse } = useMutations(COX_MODLE_APP, ['toggleCollapse'])
  
  const logout = () => {
    // TODO: to logout
  }
  
  </script>
  
  <style lang="scss" scoped>
  .header {
    flex-shrink: 0;
    height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .collapse {
    padding: 0 24px;
    cursor: pointer;
    i {
      font-size: 20px;
      color: gray;
    }
  }
  .right {
    padding-right: 50px;
    display: flex;
    align-items: center;
  }
  .program {
    font-size: 14px;
    margin-right: 20px;
  }
  .requestAuth {
    flex-shrink: 0;
    font-size: 14px;
    margin-right: 20px;
    cursor: pointer;
    &:hover{
      color: #409eff;
    }
  }
  .user{
    display: flex;
    align-items: center;
    color: gray;
    cursor: pointer;
  }
  .avatar{
    border-radius: 50%;
    border: 1px solid #C0C0C0;
    width: 32px;
    height: 32px;
  }
  .name {
    margin-left: 10px;
    margin-right: 5px;
  }
  .logout{
    color: #606266;
    text-decoration: none
  }
  </style>
  