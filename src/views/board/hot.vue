<template>
    <div>
        <el-card shadow="hover">
            <template #header>
                <div class="clearfix">
                    <span>热门技术</span>
                </div>
            </template>
            <div id="card1">
                <echarts-rose v-if="xinXiGongbu.loading == false" :data="xinXiGongbu.data1" :width="xinXiGongbu.width"
                    :radius="xinXiGongbu.radius"></echarts-rose>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import { useXinXiGongBu } from '@/stores/xinXiGongbu';
const xinXiGongbu = useXinXiGongBu();
</script>