<template>
  <div id="main3" :style="{height:this.height}"></div>
</template>
<script>
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
export default {
  props: ['data3', 'width','titleText','titleSbuText','lable','height'],
  created() {
    echarts.use([
      TitleComponent,
      TooltipComponent,
      LegendComponent,
      PieChart,
      CanvasRenderer,
      LabelLayout
    ]);
  },
  mounted() {
    var chartDom = document.getElementById('main3');
    var myChart = echarts.init(chartDom);
    var option;

    option = {
      title: {
        text: this.titleText,
        subtext:this.titleSbuText,
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        // orient: 'vertical',
        top: 'bottom'
      },
      series: [
        {
          name: this.lable,
          type: 'pie',
          radius: '68%',
          data: this.data3,
          center: ['50%', '50%'],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: false
          },
        }
      ]
    };

    option && myChart.setOption(option);
  }
}
</script>
<style>
#main3 {
  /* width: 600px; */
  width: 100%;
 
  margin: auto;

}
</style>