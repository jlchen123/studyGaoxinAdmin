<template>
    <div>

        <el-upload drag :action=adress multiple :headers="file.headers"  :on-remove="handle">
            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
            <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
            </div>
        </el-upload>





    </div>
</template>

<script setup lang="ts">

import { ipConfig } from '@/global/ipConfig';
import {delFile } from "../request/api";
import { ref } from 'vue';

import {useFile} from '@/stores/file'
const file=useFile();
const  handle = (rawFile: any) => {
    let filePath=file.headers.filePath+"\\"+rawFile.name;
    delFile("filePath="+filePath);
  
};

const adress = ref(ipConfig + "api/uploadFile");

</script>

<style scoped></style>
