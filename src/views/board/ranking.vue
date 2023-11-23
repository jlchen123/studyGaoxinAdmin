<template>
    <div>
        <el-card shadow="hover" v-loading="user.loading">
            <template #header>
                <div class="clearfix">
                    <span>学习排行榜</span>
                </div>
            </template>
            <div style="width: 100%;padding: 5px;color: white; background-color:rgb(45, 140, 240) ;margin-bottom: 10px;">
                <div style="text-align: center;">你的名次:第{{ user.items.userDuration[user.items.userDuration.length - 1][0] }}名
                </div>
            </div>

            <div v-for="item, index in user.items.userDuration" style="margin-bottom: 10px;">
                <div v-if="index != user.items.userDuration.length - 1 && item[3] != '0.00'">
                    <userBar :mingci="item[0]" :touxiang="item[4]" :xingming="item[2]" :zongfen="item[3]"
                        :department="item[1]" :personal-message="item[5]"></userBar>
                    <!-- 第{{ item[0] }}名：{{
									item[2]
								}}
									本年度学时：{{ item[3] }}S -->
                    <div style="height: 10px;"></div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useUser } from '@/stores/user';
import { useProperties } from '@/global/properties'

const properties = useProperties();
const user = useUser()
const loading = ref(false)
onMounted(() => {
    user.loading = true;
    user.asyncGetInfo();
    loading.value = false
});
</script>