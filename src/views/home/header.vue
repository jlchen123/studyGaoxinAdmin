<template>
  <el-menu style="align-items: center" :default-active="activeIndex" mode="horizontal" :ellipsis="false"
    >
    <div>
      <img style="height: 40px;" :src=logo  />
    </div>
    <div style="margin-left: 20px;">
      高新技术学习平台后台管理系统
    </div>


    <div class="flex-grow" />
    <div>
      <darkButton></darkButton>
    </div>
    <el-avatar :size="40" :src="image" />
    
    <el-sub-menu index="2">
      <template #title>个人中心</template>
      <el-menu-item index="2-1" >item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3" @click="logout">退出登录</el-menu-item>

    </el-sub-menu>

  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { onMounted } from 'vue'
import logo from '@/assets/images/logo.png'
import darkButton from '@/components/darkButton.vue';
import { authorize } from '@/global/authorize'
import { authItemName } from '@/global/ipConfig'
import { useRouter } from 'vue-router';
const router=useRouter()
const activeIndex = ref('2')
const image = ref('')
let str = localStorage.getItem(authItemName);
if (str) {
  authorize.loginInfo=JSON.parse(str)
}
onMounted(() => {
  image.value = authorize.loginInfo.base64Image
});
function logout(){
  localStorage.removeItem(authItemName)
  router.push('/login');
}
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
</style>
