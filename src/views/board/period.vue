<template>
    <div>
        <el-card shadow="hover">
            <template #header>
                <div class="clearfix">
                    <span>各部门/分院学时统计</span>
                </div>
            </template>
            <div> <echarts-bar v-if="xinXiGongbu.loading == false" :data2="xinXiGongbu.data2"></echarts-bar></div>
        </el-card>
    </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue';
import { useXinXiGongBu } from '@/stores/xinXiGongbu';

const xinXiGongbu = useXinXiGongBu();
onMounted(() => {
    xinXiGongbu.loading = true;
    xinXiGongbu.asyncGetInfo();
});
</script>