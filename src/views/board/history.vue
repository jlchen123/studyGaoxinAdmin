<template>
    <div>
        <el-card shadow="hover">
            <template #header>
                <div class="clearfix">
                    <span>学习曲线</span>
                </div>
            </template>
           
            
                
               
               
            
            
            <el-row>
                <echarts-category :datax="res.xaxisData" :dataY="res.seriesData" v-if="show"></echarts-category>
            </el-row>
            <div style="text-align: center;">
                <el-date-picker v-model="value1" type="daterange" format="YYYY年MM月DD日" unlink-panels range-separator="To"
                start-placeholder="开始日期" end-placeholder="结束日期" :shortcuts="shortcuts" :default-value="defaultTime" @change="a" />
             </div>
               
        </el-card>
       
      
    </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getDate } from '@/request/api'
const show=ref(false)
const value1 = ref('')
const defaultTime = ref<[Date, Date]>([
    getStart(),
    new Date(),
])

const res = ref(
    {
        seriesData: [0],
        xaxisData: ['']
    }
)

onMounted(() => {
    (value1.value as any) = [getStart() + '', new Date() + '',]
    a();
});
async function a() {
    show.value=false;
    const date = new Date(value1.value[0]);
    let sy = date.getFullYear();
    let sm = date.getMonth() + 1
    let sd = date.getDate()
    const date1 = new Date(value1.value[1]);
    let ey = date1.getFullYear();
    let em = date1.getMonth() + 1
    let ed = date1.getDate()
    res.value = await getDate("sy=" + sy + '&sm=' + sm + '&sd=' + sd + '&ey=' + ey + '&em=' + em + '&ed=' + ed)
    show.value=true;

}
function getStart(): Date {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
    return start
};
const shortcuts = [
    {
        text: '过去一个星期',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
        },
    },
    {
        text: '过去一个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
        },
    },
    {
        text: '过去三个月',
        value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
        },
    },
]
</script>