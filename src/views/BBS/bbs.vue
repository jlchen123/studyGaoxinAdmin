<template>
    <div>
        <el-card shadow="hover">
            <template #header>
                <div class="clearfix">
                    <span>公告管理</span>
                </div>
            </template>

            <el-input v-model="jishJiaoliu.plateContent1" placeholder="Please input">
                <template #prepend>
                    <label>技术交流板块</label>
                </template>
                <template #append>
                    <el-button type="primary" @click="insertPlate('1')">修改公告</el-button>
                </template>
            </el-input>
            <div style="height: 10px;"></div>

            <el-input v-model="jishJiaoliu.plateContent2" placeholder="Please input">
                <template #prepend>
                    <label>杂谈</label>
                </template>
                <template #append>
                    <el-button type="primary" @click="insertPlate('2')">修改公告</el-button>
                </template>
            </el-input>

            <div style="height: 10px;"></div>
            <el-input v-model="jishJiaoliu.plateContent3" placeholder="Please input">
                <template #prepend>
                    <label>Bug反馈</label>
                </template>
                <template #append>
                    <el-button type="primary" @click="insertPlate('3')">修改公告</el-button>
                </template>
            </el-input>
        </el-card>
        <div style="height: 10px;"></div>
        <el-card shadow="hover">
            <template #header>
                <div class="clearfix">
                    <span>主题帖管理</span>
                </div>
            </template>
            <el-table :data="jishJiaoliu.navList" :show-header="false" style="width: 100%">
					<el-table-column width="200">
						<template #default="scope">
							<span  >{{ scope.row.ttopic }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="tcontents" ></el-table-column>
					<el-table-column width="120">
						<template #default="scope">
							
							<el-button  type="primary" @click="jishJiaoliu.delTopic(scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				
				</el-table>
        </el-card>
        <div style="height: 10px;"></div>
        <el-card shadow="hover">
            <template #header>
                <div class="clearfix">
                    <span>BBS文件清理</span>
                </div>
            </template>
            <el-button  type="primary" @click="dod">执行</el-button>
            <mirrorTextArea :code="websocket.line" :list="list" @fn="getlogFile" @fm="clear" ></mirrorTextArea>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { useJishuJiaoliu } from '@/stores/jishuJiaoliu'
import { authorize } from '@/global/authorize';
import { onMounted, ref } from 'vue';
import {  updateBBSFiles } from "@/request/api";
import { useWebsocket } from '@/global/WebSocket'
import { getLog,getLogFile } from '@/request/api'
const list=ref([])
const websocket = useWebsocket();
const jishJiaoliu = useJishuJiaoliu()
function insertPlate(sid: string) {
    if (sid == '1') {
        jishJiaoliu.plate.sContent = jishJiaoliu.plateContent1;
    }
    if (sid == '2') {
        jishJiaoliu.plate.sContent = jishJiaoliu.plateContent2;
    }
    if (sid == '3') {
        jishJiaoliu.plate.sContent = jishJiaoliu.plateContent3;
    }
    jishJiaoliu.plate.sId = sid;
    jishJiaoliu.plate.sUserId = authorize.loginInfo.userId
    jishJiaoliu.plate.sUserName = authorize.loginInfo.username
    jishJiaoliu.insertPlate();
}
onMounted(() => {
    jishJiaoliu.getPlate('1')
    jishJiaoliu.getPlate('2')
    jishJiaoliu.getPlate('3')
    jishJiaoliu.UpDateTopicList();

});
function clear(){
    websocket.line=''
}
function getlogFile(){
    
}
async function dod(){
    await updateBBSFiles()
}
</script>