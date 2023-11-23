<template>
    <div id="main"></div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { useAdmin } from "@/stores/admin";
type EChartsOption = echarts.EChartsOption;
const admin = useAdmin();

var chartDom;
var myChart: any;



var option: EChartsOption;
option = {
    tooltip: {
        formatter: '{a} <br/>{b} : {c}人'
    },
    series: [
        {
            name: 'Pressure',
            type: 'gauge',
            progress: {
                show: true
            },
            detail: {
                valueAnimation: true,
                formatter: '{value}'
            },
            data: [
                {
                    value: 0,
                    name: '在线人数'
                }
            ]
        }
    ]
};
onMounted(() => {
    chartDom = document.getElementById('main')!;
    myChart = echarts.init(chartDom);
    admin.myChart = myChart;

   

    option && myChart.setOption(option);
})


</script>
<style>
#main {
    width: 100%;
    height: 450px;
    margin: auto;

}
</style>

