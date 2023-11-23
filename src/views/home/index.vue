<template>
    <div id="home" >
      
      
            <div class="common-layout">
                <el-container>
                    <el-header>
                        <Header></Header>
                    </el-header>
                    <el-container>
                        <el-aside width="200px" >
                            <Side style="height: 91vh;"></Side>
                        </el-aside>
                        <el-main>
                            <el-scrollbar height="91vh">
                                <router-view v-slot="{ Component }">
                                <transition name="el-fade-in-linear">
                                    <!-- <keep-alive> -->
                                    <component :is="Component"></component>
                                    <!-- </keep-alive> -->
                                </transition>
                            </router-view>
                        </el-scrollbar>
                          
                        </el-main>
                    </el-container>
                </el-container>
            </div>
       
       


    </div>
</template>
<script lang="ts" setup>
import Header from './header.vue'
import Side from './side.vue'
import { onMounted } from 'vue';
import { useWebsocket} from '@/global/WebSocket'
const websocket=useWebsocket()
onMounted(() => {
  if (websocket.flag == true) {
    websocket.getSetup();
    websocket.flag = false;
  }
});
</script>
<style ></style>