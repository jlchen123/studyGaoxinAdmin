<template>
    <div id="main1"> </div>
</template>
<script  >
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
export default {
    props: ['data', 'width', 'radius'],
    created() {
        // 注册必须的组件
        echarts.use([
            TitleComponent,
            ToolboxComponent,
            TooltipComponent,
            LegendComponent,
            PieChart,
            CanvasRenderer,
            LabelLayout
        ]);
    },
    mounted() {
        // 接下来的使用就跟之前一样，初始化图表，设置配置项
        var chartDom = document.getElementById('main1');
        var myChart = echarts.init(chartDom);
        myChart.width = 100;
        myChart.height = 100;
        var option;
        option = {
            title: {
        text: '热门技术',
        subtext: '最受人喜爱的技术',
        left: 'center'
      },
            legend: {
                top: 'bottom'
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b} <br/>学习时长 : {c}h <br/>学习时长占比 : {d}%'
            },


            series: [
                {
                    name: '总学时',
                    type: 'pie',
                    radius: [20, 150],
                    center: ['50%', '50%'],
                    label: {
                        show: false
                    },
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 5
                    },
                    data: this.data
                }
            ]
        };
        option && myChart.setOption(option);
    }
}
</script>
<style>
#main1 {
    /* width: 600px; */
    height: 400px;
    margin: auto;


}
</style>