<template>
    <div>
        <el-select v-model="value" class="m-2" placeholder="Select" size="large" change="getChange">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"
                @click="getChange(value)" />
        </el-select>
       <el-button type="primary">打开文件</el-button>
        <input @change="uploadFile" type="file" class="el-button--primary">
        <div>
            <Codemirror v-model:value="code" :options="cmOptions"  ref="cmRef"  style="font-size: 16px; height: 100vh;line-height: 1.5;" 
                @change="onChange" @input="onInput" @ready="onReady" @Select="onclick">
            </Codemirror>
        </div>

    </div>
</template>
<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from "vue"
import "codemirror/mode/javascript/javascript.js"
import Codemirror from "codemirror-editor-vue3"
import type { CmComponentRef } from "codemirror-editor-vue3"
import type { Editor, EditorConfiguration } from "codemirror"
import 'codemirror/theme/abbott.css'
import 'codemirror/theme/3024-day.css'
import 'codemirror/theme/3024-night.css'
import 'codemirror/theme/abbott.css'
import 'codemirror/theme/abcdef.css'
import 'codemirror/theme/ambiance-mobile.css'
import 'codemirror/theme/ambiance.css'
import 'codemirror/theme/ayu-dark.css'
import 'codemirror/theme/ayu-mirage.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/theme/base16-light.css'
import 'codemirror/theme/bespin.css'
import 'codemirror/theme/blackboard.css'
import 'codemirror/theme/cobalt.css'
import 'codemirror/theme/colorforth.css'
import 'codemirror/theme/darcula.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/theme/duotone-dark.css'
import 'codemirror/theme/duotone-light.css'
import 'codemirror/theme/eclipse.css'
import 'codemirror/theme/elegant.css'
import 'codemirror/theme/erlang-dark.css'
import 'codemirror/theme/gruvbox-dark.css'
import 'codemirror/theme/hopscotch.css'
import 'codemirror/theme/icecoder.css'
import 'codemirror/theme/idea.css'
import 'codemirror/theme/isotope.css'
import 'codemirror/theme/juejin.css'
import 'codemirror/theme/lesser-dark.css'
import 'codemirror/theme/liquibyte.css'
import 'codemirror/theme/lucario.css'
import 'codemirror/theme/material-darker.css'
import 'codemirror/theme/material-ocean.css'
import 'codemirror/theme/material-palenight.css'
import 'codemirror/theme/material.css'
import 'codemirror/theme/mbo.css'
import 'codemirror/theme/mdn-like.css'
import 'codemirror/theme/midnight.css'
import 'codemirror/theme/monokai.css'
import 'codemirror/theme/moxer.css'
import 'codemirror/theme/neat.css'
import 'codemirror/theme/neo.css'
import 'codemirror/theme/night.css'
import 'codemirror/theme/nord.css'
import 'codemirror/theme/oceanic-next.css'
import 'codemirror/theme/panda-syntax.css'
import 'codemirror/theme/paraiso-dark.css'
import 'codemirror/theme/paraiso-light.css'
import 'codemirror/theme/pastel-on-dark.css'
import 'codemirror/theme/railscasts.css'
import 'codemirror/theme/rubyblue.css'
import 'codemirror/theme/seti.css'
import 'codemirror/theme/shadowfox.css'
import 'codemirror/theme/solarized.css'
import 'codemirror/theme/ssms.css'
import 'codemirror/theme/the-matrix.css'
import 'codemirror/theme/tomorrow-night-bright.css'
import 'codemirror/theme/tomorrow-night-eighties.css'
import 'codemirror/theme/ttcn.css'
import 'codemirror/theme/twilight.css'
import 'codemirror/theme/vibrant-ink.css'
import 'codemirror/theme/xq-dark.css'
import 'codemirror/theme/xq-light.css'
import 'codemirror/theme/yeti.css'
import 'codemirror/theme/yonce.css'
import 'codemirror/theme/zenburn.css'



const value = ref('')
const code = ref()
const uploadFile = async(event: any) => {
    console.log(event)
    const file = event.target.files[0]
    const filePath = URL.createObjectURL(file)
    const response = await fetch(filePath)
    const filteredText: any =await response.text()
    // 文件内格式处理
    code.value = filteredText
  //  console.log(content.value)
}

function getChange(value: string) {
    o.value.theme = value
}

const options = ref([
    {
        value: 'ayu-mirage',
        label: 'ayu-mirage',
    },
])

const themes = [
    '3024-day',
    '3024-night',
    'abbott',
    'abcdef',
    'ambiance-mobile',
    'ambiance',
    'ayu-dark',
    'ayu-mirage',
    'base16-dark',
    'base16-light',
    'bespin',
    'blackboard',
    'cobalt',
    'colorforth',
    'darcula',
    'dracula',
    'duotone-dark',
    'duotone-light',
    'eclipse',
    'elegant',
    'erlang-dark',
    'gruvbox-dark',
    'hopscotch',
    'icecoder',
    'idea',
    'isotope',
    'juejin',
    'lesser-dark',
    'liquibyte',
    'lucario',
    'material-darker',
    'material-ocean',
    'material-palenight',
    'material',
    'mbo',
    'mdn-like',
    'midnight',
    'monokai',
    'moxer',
    'neat',
    'neo',
    'night',
    'nord',
    'oceanic-next',
    'panda-syntax',
    'paraiso-dark',
    'paraiso-light',
    'pastel-on-dark',
    'railscasts',
    'rubyblue',
    'seti',
    'shadowfox',
    'solarized',
    'ssms',
    'the-matrix',
    'tomorrow-night-bright',
    'tomorrow-night-eighties',
    'ttcn',
    'twilight',
    'vibrant-ink',
    'xq-dark',
    'xq-light',
    'yeti',
    'yonce',
    'zenburn',
]

options.value = [];
for (let i = 0; i < themes.length; i++) {
    let op = {
        value: '',
        label: '',
    }
    op.value = themes[i]
    op.label = themes[i]
    options.value.push(op);
}

const o = ref({
    mode: "text/javascript",
    theme: 'ayu-mirage'
})
const cmRef = ref<any>()
let cmOptions: EditorConfiguration = o.value

const onChange = (val: string, cm: Editor) => {
 //   console.log(val)
   // console.log(cm.getValue())
}

const onInput = (val: string) => {
 //   console.log(val)
}
const onclick = (val: string) => {
  //  console.log(val)
}

const onReady = (cm: Editor) => {
  //  console.log(cm.focus())
}

onMounted(() => {

    setTimeout(() => {
        //  cmRef.value?.refresh()
    }, 1000)

    setTimeout(() => {
        //   cmRef.value?.resize(300, 200)
    }, 2000)

    setTimeout(() => {
        //    cmRef.value?.cminstance.isClean()
    }, 3000)
})

onUnmounted(() => {
    cmRef.value?.destroy()
})
</script>
<style>
.el-button--primary {
    --el-button-text-color: var(--el-color-white);
    --el-button-bg-color: var(--el-color-primary);
    --el-button-border-color: var(--el-color-primary);
    --el-button-outline-color: var(--el-color-primary-light-5);
    --el-button-active-color: var(--el-color-primary-dark-2);
    --el-button-hover-text-color: var(--el-color-white);
    --el-button-hover-link-text-color: var(--el-color-primary-light-5);
    --el-button-hover-bg-color: var(--el-color-primary-light-3);
    --el-button-hover-border-color: var(--el-color-primary-light-3);
    --el-button-active-bg-color: var(--el-color-primary-dark-2);
    --el-button-active-border-color: var(--el-color-primary-dark-2);
    --el-button-disabled-text-color: var(--el-color-white);
    --el-button-disabled-bg-color: var(--el-color-primary-light-5);
    --el-button-disabled-border-color: var(--el-color-primary-light-5);
}
</style>