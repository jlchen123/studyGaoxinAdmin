<template>
  <div class="con" shadow="hover">
    <el-row :gutter="20">
      <el-col :span="2">
        <div align="right" v-if="mingci == '1' || mingci == '2' || mingci == '3'"> <el-icon :size="30" :color="color">
            <Trophy />
          </el-icon></div>

      </el-col>
      <el-col :span="4">
        <div class="mingci">第{{ mingci }}名</div>
      </el-col>
      <el-col :span="2">
        <div align="right" class="touxiang">
          <el-avatar :size="30" :src="touxiang" />
        </div>
      </el-col>
      <el-col :span="4">
        <div style="line-height: 1.3;">
          <div class="xingming" style="margin-right: 0px;">{{ xingming }}</div>
          <div style="font-size: x-small;color: #999;">{{ department }}</div>
        </div>

      </el-col>
      <el-col :span="8">
        <div style="line-height: 30px;">
          <div style="font-size: x-small;color: #999; line-height: 1.3;" >{{ personalMessage }}</div>
        </div>
       
      </el-col>
   
      <el-col :span="4">
        <div class="zongfen" align="right">{{ zongfen }}小时</div>
      </el-col>
    </el-row>

  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, type HtmlHTMLAttributes, type InputHTMLAttributes } from 'vue';
const color = ref('')
const color1 = ["#42b983", "#f1e05a", "#f56c6c"]
onMounted(() => {
  if (props.mingci == '1') {
    color.value = color1[0];
  } else if (props.mingci == '2') {
    color.value = color1[1];
  } else if (props.mingci == '3') {
    color.value = color1[2];
  }
});
const props = defineProps<{

  mingci: string;
  touxiang: string;
  xingming: string;
  zongfen: string;
  department:string;
  personalMessage:string;
}>();

</script>
<style scoped>
.con {
  height: 30px;
  width: 100%;
  padding: 5px;
  line-height: 30px;


}

.mingci {
  text-align: center;
}

.touxiang {
  margin-right: 0px;

}

.xingming {
  margin-left: 0;
}

</style>