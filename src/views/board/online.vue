<template>
    <div class="container">
        <el-tabs>
          
                <el-card >
                    <template #header>
                        <div class="clearfix">
                            <span >管理员面板</span>
                        </div>
                    </template>
                    <el-row type="flex" justify="center" >
                        <el-button type="primary" style="width: 90%; text-align: center;"
                            @click="updateFileListAdmin">更新文件列表</el-button>
                    </el-row>

                    <div style="height: 20px;"> </div>
                  <el-card>
                    <template #header>
                        <div class="clearfix">
                            <span >在线人数</span>
                        </div>
                    </template>
                    <div v-for="(userl, index) in admin.userOnline" :key="index">
                            <el-card>
                                <p style="color: black;line-height: 1; text-align: left;"> {{ userl.username }}</p>
                                <p style="font-size: 12px; line-height: 1; text-align: left;"> {{ userl.unit + "\\" +
                                    userl.userDepartment + " \\ " + userl.username }} </p>
                            </el-card>
                            
                            <div style="height: 10px;"></div>
                        </div>
                  </el-card>
                       
                  
                    <div style="text-align: center;"> 共{{ admin.userOnline.length }}人</div>
                </el-card>
           


        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAdmin } from "@/stores/admin";
import { updateFileList } from "@/request/api";
import { ElMessage, ElNotification } from 'element-plus';


const admin = useAdmin();
let responseMessage = {
    messageClass: '',
    message: '',
    result: false,
};
async function updateFileListAdmin() {
    responseMessage = await updateFileList();
    if (responseMessage.result == true) {
        ElMessage(responseMessage.message);
    }
}
onMounted(() => {
   
});

</script>

<style>
.message-title {
    cursor: pointer;
}

.handle-row {
    margin-top: 30px;
}
</style>
