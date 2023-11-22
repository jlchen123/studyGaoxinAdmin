<template>

  
      
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          router
        >
         
          <el-menu-item index="/board">
            <el-icon><icon-menu /></el-icon>
            <span>看板</span>
          </el-menu-item>
          <el-menu-item index="/account" >
            <el-icon><document /></el-icon>
            <span>账户管理</span>
          </el-menu-item>
          <el-menu-item index="/file" >
            <el-icon><document /></el-icon>
            <span>文件管理</span>
          </el-menu-item>
       
          <el-menu-item index="/bbs" >
            <el-icon><document /></el-icon>
            <span>BBS管理</span>
          </el-menu-item>
          <el-menu-item index="/log" >
            <el-icon><document /></el-icon>
            <span>日志控制台</span>
          </el-menu-item>
        
        </el-menu>
  


  </template>
  
  <script lang="ts" setup>
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting,
  } from '@element-plus/icons-vue'
  const handleOpen = (key: string, keyPath: string[]) => {
   // console.log(key, keyPath)
  }
  const handleClose = (key: string, keyPath: string[]) => {
  //  console.log(key, keyPath)
  }
  </script>
  