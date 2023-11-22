<template>
    <div id="main2"></div>
</template>
<script>
import * as echarts from 'echarts/core';
import { TooltipComponent, GridComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
export default {
    props:['data2'],
    created() {
        echarts.use([TooltipComponent, GridComponent, BarChart, CanvasRenderer]);
    },
    mounted() {
        var chartDom = document.getElementById('main2');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
        
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: '{b} <br/>学习时长 : {c}h'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: 0,
                top:'3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: this.data2.name,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        rotate: 60

                    },
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '学时',
                    type: 'bar',
                    barWidth: '50%',
                    data: this.data2.value
                }
            ]
        };

        option && myChart.setOption(option);
    }
}
</script>
<style>
#main2 {
   width: 100%;
   height: 500px;
  margin: auto;
  
}
</style>