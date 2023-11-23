<template>
    <div class="container">


        <el-row :gutter="20">
            <el-col :span="12">
                <el-card>
                    <template #header>
                        <div class="clearfix">
                            <span>在线人数</span>
                        </div>
                    </template>

                    <EchartsGauge></EchartsGauge>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-card style="height: 550px;">
                    <template #header>
                        <div class="clearfix">
                            <span>在线人员</span>
                        </div>
                    </template>
                    <div v-for="(userl, index) in admin.userOnline" :key="index">
                        <el-card>
                            <p style="line-height: 1; text-align: left;"> {{ userl.username }}</p>
                            <p style="font-size: 12px; line-height: 1; text-align: left;"> {{ userl.unit + "\\" +
                                userl.userDepartment + " \\ " + userl.username }} </p>
                        </el-card>

                        <div style="height: 10px;"></div>
                    </div>
                </el-card>


            </el-col>
        </el-row>









    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useAdmin } from "@/stores/admin";
import EchartsGauge from '@/components/EchartsGauge.vue'
import { getUserOline } from '@/request/api'


const admin = useAdmin();
admin.userOnline = [];


onMounted(() => {
    getOnlineUserList()
});
async function getOnlineUserList() {
    admin.userOnline = await getUserOline();

    admin.option.series[0].data[0].value = admin.userOnline.length;
    (admin.myChart as any).setOption(admin.option);
}
</script>

<style>
.message-title {
    cursor: pointer;
}

.handle-row {
    margin-top: 30px;
}
</style>
