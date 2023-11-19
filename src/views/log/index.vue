<template>
    <div>
        <mirrorTextArea :code="websocket.line" :list="log.logFiles" @fn="getlogFile" @fm="clear" ></mirrorTextArea>
    </div>
</template>
<script setup lang="ts">
import mirrorTextArea from '@/components/mirrorTextArea.vue';
import { useWebsocket } from '@/global/WebSocket'
import { getLog,getLogFile } from '@/request/api'
import { onMounted,ref } from 'vue';
const websocket = useWebsocket();
const log = ref(
    {
        logText: '',
        logFiles: ['']
    }
)
onMounted(() => {
    get()
});
function getlogFile(logName:string){
   
   gerLogFile(logName);

}
function clear(){
    websocket.line=''
}
async function gerLogFile(fileName:string) {
    log.value = await getLogFile("logFileName="+fileName);
    websocket.line=log.value.logText
}
async function get() {
    log.value = await getLog();
    websocket.line=log.value.logText

}

</script>