<template>
    <div id="main3"></div>
</template>
<script >

import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { reactive, watch } from 'vue'
export default {
    props: ['datax', 'dataY'],
    created() {
        echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);
    },
    mounted() {
        var chartDom = document.getElementById('main3');
        var myChart = echarts.init(chartDom);
        var option;

        option = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.datax
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: this.dataY,
                    type: 'line',
                    areaStyle: {},
                    smooth: 0.6,
                    symbol: 'none',
                }
            ]
        };

        option && myChart.setOption(option);
    },
    
}











</script>
<style>
#main3 {
    width: 100%;
    height: 450px;
    margin: auto;
    padding: 0
}
</style>