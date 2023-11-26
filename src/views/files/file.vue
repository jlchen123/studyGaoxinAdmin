<template>
    <div>
        <el-row type="flex" justify="center">
            <el-button type="primary" style="width: 90%; text-align: center;"
                @click="updateFileListAdmin">更新文件列表</el-button>
        </el-row>
        <div style="height: 20px;"> </div>
        <el-row>
            <el-col :span="4">
                <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick" />
            </el-col>
            <el-col :span="20">
                <el-card shadow="hover">
                    <template #header>
                        <div class="clearfix">
                            <span>{{ title }}</span>
                        </div>
                    </template>
                    <div v-for="item in content">
                        <div v-if="isFile(item.title)">
                            <el-icon size="20" color="blue">
                                <Folder />
                            </el-icon>
                            {{ item.title }}
                            <div style="height: 10px;"></div>
                        </div>
                        <div v-else>

                            {{ item.title }}<el-button @click="removeFile(item.path, item.title)"
                                style="margin-left: 50px;">
                                删除
                            </el-button>
                            <div style="height: 10px;"></div>
                        </div>
                    </div>






                    <!-- <el-button @click="uploadShow"> 添加</el-button> -->
                    <upload v-if="value"></upload>
                </el-card>
            </el-col>
        </el-row>

    </div>
</template>
<script setup lang="ts">
import { updateFileList, getTechnicals } from "@/request/api";
import { ElMessage, ElNotification } from 'element-plus';
import { onMounted, ref } from 'vue';
import { authorize } from '@/global/authorize';
import { useFile } from '@/stores/file'
import { isFile } from '@/global/file'
import { delFile } from "@/request/api";
const file = useFile();
let responseMessage = {
    messageClass: '',
    message: '',
    result: false,
};
async function updateFileListAdmin() {
    await updateFileList();
   
}
const value = ref(false)
const title = ref('仓库')
const content = ref([
    {
        title: '基础资料库',
        path: '',
        realPath: ''
    },
    {
        title: '案例库',
        path: '',
        realPath: ''
    },
    {
        title: '能力提升库',
        path: '',
        realPath: ''
    }
])
const header = {
    token: '',
    filePath: '',
}
function removeFile(path: string, title: string) {

    del(path)
    let newArr = [{
        title: '能力提升库',
        path: '',
        realPath: ''
    }]
    newArr = []
    for (let i = 0; i < content.value.length; i++) {
        if (content.value[i].title != title) {
            newArr.push(content.value[i])
        }
    }
    content.value = newArr
    data.value = []
    getTname()

}
async function del(path: string) {
    responseMessage = await delFile("filePath=" + path)
    if (responseMessage.result == true) {
        ElMessage.success(responseMessage.message);
    }
    data.value = []
}

onMounted(() => {
    data.value = []
    getTname()
});
async function getTname() {
    let res = await getTechnicals();
    data.value = []
    let child: Tree = { label: "基础资料库", children: [], path: '' }
    data.value.push(child)
    child = { label: "案例库", children: [], path: '' }
    data.value.push(child)
    child = { label: "能力提升库", children: [], path: '' }
    data.value.push(child)
    Tname.value = res;
    for (let j = 0; j < 3; j++) {
        let newChild: Tree = { label: Tname.value[j].technicalClass, children: [], path: "基础资料库" + "\\" + Tname.value[j].technicalClass }
        for (let i = 0; i < Tname.value[j].menu1.length; i++) {
            let newChildItem: Tree = { label: Tname.value[j].menu1[i].technical, children: [], path: "基础资料库" + "\\" + Tname.value[j].technicalClass + "\\" + Tname.value[j].menu1[i].technical }
            for (let z = 0; z < CName.length; z++) {
                let newChildItemC: Tree = { label: CName[z], children: [], path: "基础资料库" + "\\" + Tname.value[j].technicalClass + "\\" + Tname.value[j].menu1[i].technical + "\\" + CName[z] }
                for (let c = 0; c < Tname.value[j].menu1[i].fileLists.length; c++) {
                    if (Tname.value[j].menu1[i].fileLists[c].filePath.indexOf("\\" + CName[z] + "\\") != -1) {
                        let newChildItemE: Tree = { label: Tname.value[j].menu1[i].fileLists[c].fileName, children: [], path: "基础资料库" + "\\" + Tname.value[j].technicalClass + "\\" + Tname.value[j].menu1[i].technical + "\\" + CName[z] + "\\" + Tname.value[j].menu1[i].fileLists[c].fileName }
                        if (!newChildItemC.children) {
                            newChildItemC.children = []
                        }
                        newChildItemC.children.push(newChildItemE)
                    }

                }
                if (!newChildItem.children) {
                    newChildItem.children = []
                }
                newChildItem.children.push(newChildItemC)
            }

            if (!newChild.children) {
                newChild.children = []
            }
            newChild.children.push(newChildItem)
        }
        if (!data.value[0].children) {
            data.value[0].children = []
        }
        data.value[0].children.push(newChild)
    }
    for (let j = 3; j < 5; j++) {
        let newChild: Tree = { label: Tname.value[j].technicalClass, children: [], path: "案例库" + "\\" + Tname.value[j].technicalClass }
        for (let i = 0; i < Tname.value[j].menu1.length; i++) {
            let newChildItem: Tree = { label: Tname.value[j].menu1[i].technical, children: [], path: "案例库" + "\\" + Tname.value[j].technicalClass + "\\" + Tname.value[j].menu1[i].technical }
            if(isFile(Tname.value[j].menu1[i].technical)){
                for (let c = 0; c < Tname.value[j].menu1[i].fileLists.length; c++) {
                let newChildItemC: Tree = { label: Tname.value[j].menu1[i].fileLists[c].fileName, children: [], path: "案例库" + "\\" + Tname.value[j].technicalClass + "\\" + Tname.value[j].menu1[i].technical }

                if (!newChildItem.children) {
                    newChildItem.children = []
                }
                newChildItem.children.push(newChildItemC)
            }

            if (!newChild.children) {
                newChild.children = []
            }
            newChild.children.push(newChildItem)
            }
           
        }
        if (!data.value[1].children) {
            data.value[1].children = []
        }
        data.value[1].children.push(newChild)
    }

    for (let j = 5; j < 8; j++) {
        let newChild: Tree = { label: Tname.value[j].technicalClass, children: [], path: "能力提升库" + "\\" + Tname.value[j].technicalClass }
        for (let i = 0; i < Tname.value[j].menu1.length; i++) {
            let newChildItem: Tree = { label: Tname.value[j].menu1[i].technical, children: [], path: "能力提升库" + "\\" + Tname.value[j].technicalClass + "\\" + Tname.value[j].menu1[i].technical }
            if(isFile(Tname.value[j].menu1[i].technical)){
                for (let c = 0; c < Tname.value[j].menu1[i].fileLists.length; c++) {
                let newChildItemC: Tree = { label: Tname.value[j].menu1[i].fileLists[c].fileName, children: [], path: "能力提升库" + "\\" + Tname.value[j].technicalClass + "\\" + Tname.value[j].menu1[i].technical }

                if (!newChildItem.children) {
                    newChildItem.children = []
                }
                newChildItem.children.push(newChildItemC)
            }

            if (!newChild.children) {
                newChild.children = []
            }
            newChild.children.push(newChildItem)
            }
           
        }
        if (!data.value[2].children) {
            data.value[2].children = []
        }
        data.value[2].children.push(newChild)
    }
}
const CName = ['原理介绍', '操作说明', '操作视频', '培训视频', '其他资料']
const Tname = ref(
    [{
        technicalClass: '',
        menu1: [
            {
                technical: '',
                fileLists: [{
                    fileName: '',
                    filePath: ''
                }]
            }
        ]
    }]
)
interface Tree {
    label: string
    children?: Tree[]
    path: string
}
const ResponseMessage = ref({
    messageClass: '',
    message: '',
    result: false,

})
function handleNodeClick(data: any) {
    // header.filePath =data.path;
    // header.token = authorize.loginInfo.token+"";
    // uploadKey.value++
    // file.headers.filePath=data.path
    title.value = data.path
    let arr = data.path.split("\\")
    content.value = [];
    switch (arr.length) {
        case 1:
            for (let i = 0; i < Tname.value.length; i++) {
                let a = {
                    title: '',
                    path: '',
                    realPath: ''
                }
                a.title = Tname.value[i].technicalClass
                content.value.push(a)
            }
            value.value = false
            break;
        case 2:
            for (let i = 0; i < Tname.value.length; i++) {
                if (arr[arr.length - 1] == Tname.value[i].technicalClass) {
                    for (let j = 0; j < Tname.value[i].menu1.length; j++) {
                        let a = {
                            title: '',
                            path: '',
                            realPath: ''
                        }
                        a.title = Tname.value[i].menu1[j].technical
                        content.value.push(a)
                    }
                }
            }
            value.value = false
            if(arr[1]=="案例库"){
                value.value =true
            }
            break;

        case 3:
            if (arr[0] == "基础资料库") {
                for (let k = 0; k < CName.length; k++) {
                    let a = {
                        title: '',
                        path: '',
                        realPath: ''
                    }
                    a.title = CName[k]
                    content.value.push(a)
                }
                value.value = false
            } else {
                for (let i = 0; i < Tname.value.length; i++) {
                    for (let j = 0; j < Tname.value[i].menu1.length; j++) {
                        if (arr[arr.length - 1] == Tname.value[i].menu1[j].technical) {
                            for (let k = 0; k < Tname.value[i].menu1[j].fileLists.length; k++) {

                                let a = {
                                    title: '',
                                    path: '',
                                    realPath: ''
                                }
                                a.title = Tname.value[i].menu1[j].fileLists[k].fileName
                                a.path = title.value + "\\" + a.title
                                a.realPath = Tname.value[i].menu1[j].fileLists[k].filePath
                                content.value.push(a)


                            }
                        }
                    }

                }
                value.value = true
            }
           
            break;
        case 4:

            for (let i = 0; i < Tname.value.length; i++) {
                for (let j = 0; j < Tname.value[i].menu1.length; j++) {
                    if (arr[arr.length - 2] == Tname.value[i].menu1[j].technical) {
                        for (let k = 0; k < Tname.value[i].menu1[j].fileLists.length; k++) {

                            if (Tname.value[i].menu1[j].fileLists[k].filePath.indexOf("\\" + arr[arr.length - 1] + "\\") != -1) {
                                let a = {
                                    title: '',
                                    path: '',
                                    realPath: ''
                                }
                                a.title = Tname.value[i].menu1[j].fileLists[k].fileName
                                a.path = title.value + "\\" + a.title
                                a.realPath = Tname.value[i].menu1[j].fileLists[k].filePath
                                content.value.push(a)
                            }

                        }
                    }
                }

            }

            value.value = true


            break;

    }

    console.log(arr)
    let a = ''

    file.headers.filePath = encodeURIComponent(data.path);




}

const data = ref<Tree[]>([

])
const defaultProps = {
    children: 'children',
    label: 'label',
}
</script>