<template>
    <div>
        <el-row type="flex" justify="center">
            <el-button type="primary" style="width: 90%; text-align: center;"
                @click="updateFileListAdmin">更新文件列表</el-button>
        </el-row>

    </div>
</template>
<script setup lang="ts">
import { updateFileList } from "@/request/api";
import { ElMessage, ElNotification } from 'element-plus';
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
</script>