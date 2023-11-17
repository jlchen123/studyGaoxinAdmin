<template>
  <el-menu style="align-items: center" :default-active="activeIndex" mode="horizontal" :ellipsis="false"
    @select="handleSelect">
    <div>
      <img style="height: 40px;" :src=logo alt="Element logo" />
    </div>
    <div style="margin-left: 20px;">
      高新技术学习平台后台管理系统
    </div>


    <div class="flex-grow" />
    <div>
      <darkButton></darkButton>
    </div>
    <!-- <el-avatar :size="50" src="user.authObj.base64Image" /> -->
    <el-icon size="20"><UserFilled /></el-icon>
    <el-sub-menu index="2">
      <template #title>个人中心</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>

    </el-sub-menu>
 
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import logo from '@/assets/images/logo.png'
import darkButton from '@/components/darkButton.vue';
const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
